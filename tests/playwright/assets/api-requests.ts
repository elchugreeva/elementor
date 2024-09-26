import fs from 'fs';
import { type APIRequestContext, type APIRequest } from '@playwright/test';
import { Image, Post, WpPage, StorageState } from '../types/types';
import { fetchNonce } from "../wp-authentication";

export default class ApiRequests {
	private nonce: string;
	private readonly baseUrl: string;
	constructor( baseUrl: string, nonce: string ) {
		this.nonce = nonce;
		this.baseUrl = baseUrl;
	}

	public async create( request: APIRequestContext, entity: string, data: Post ) {
		const response = await request.post( `${ this.baseUrl }/index.php`, {
			params: { rest_route: `/wp/v2/${ entity }` },
			headers: {
				'X-WP-Nonce': this.nonce,
			},
			multipart: data,
		} );

		if ( ! response.ok() ) {
			throw new Error( `
				Failed to create a ${ entity }: ${ response.status() }.
				${ await response.text() }
				${ response.url() }
				TEST_PARALLEL_INDEX: ${ process.env.TEST_PARALLEL_INDEX }
				NONCE: ${ this.nonce }
			` );
		}
		const { id } = await response.json();

		return id;
	}

	public async updateNonce ( request: APIRequestContext, url ) {
		// this.nonce =  await fetchNonce( request, this.baseUrl )
		// this.nonce =process.env.WP_REST_NONCE
		const response = await request.get( url );

		// await validateResponse( response, 'Failed to fetch page' );

		 let pageText = await response.text();
		// if ( pageText.includes( 'WordPress has been updated!' ) ) {
		// 	pageText = await updateDatabase( context, baseUrl );
		// }

		const nonceMatch = pageText.match( /var userProfileL10n = .*;/ );
		if ( ! nonceMatch ) {
			throw new Error( `Nonce not found on the page:\n"${ pageText }"` );
		}

		this.nonce = nonceMatch[ 0 ].replace( /^.*"nonce":"([^"]*)".*$/, '$1' );
	}

	public async createApiContext( request: APIRequest,
		 options: { storageStateObject: string| StorageState, wpRESTNonce: string, baseURL: string } ) {
		const context = await request.newContext( {
			baseURL: options.baseURL,
			storageState: options.storageStateObject,
			extraHTTPHeaders: {
				'X-WP-Nonce': options.wpRESTNonce,
			},
		} );

		return context;
	}

	public async createMedia( request: APIRequestContext, image: Image ) {
		const imagePath = image.filePath;
		const response = await request.post( `${ this.baseUrl }/index.php`, {

			params: { rest_route: '/wp/v2/media' },
			headers: {
				'X-WP-Nonce': this.nonce,
			},
			multipart: {
				file: fs.createReadStream( imagePath ),
				title: image.title,
				status: 'publish',
				description: image.description,
				alt_text: image.alt_text,
				caption: image.caption,
			},
		} );

		if ( ! response.ok() ) {
			throw new Error( `
			Failed to create default media: ${ response.status() }.
			${ await response.text() }
		` );
		}

		const { id } = await response.json();

		return id;
	}

	public async deleteMedia( request: APIRequestContext, ids: string[] ) {
		const requests = [];

		for ( const id in ids ) {
			requests.push( request.delete( `${ this.baseUrl }/index.php`, {
				headers: {
					'X-WP-Nonce': this.nonce,
				},
				params: {
					rest_route: `/wp/v2/media/${ ids[ id ] }`,
					force: 1,
				},
			} ) );
		}

		await Promise.all( requests );
	}

	public async cleanUpTestPages( request: APIRequestContext, shouldDeleteAllPages = false ) {
		const pagesPublished = await this.getPages( request ),
			pagesDraft = await this.getPages( request, 'draft' ),
			pages = [ ...pagesPublished, ...pagesDraft ];

		const pageIds = pages
			.filter( ( page: WpPage ) => shouldDeleteAllPages || page.title.rendered.includes( 'Playwright Test Page' ) )
			.map( ( page: WpPage ) => page.id );

		for ( const id of pageIds ) {
			await this.deletePage( request, id );
		}
	}

	public async installPlugin( request: APIRequestContext, slug: string, active: boolean ) {
		const response = await request.post( `${ this.baseUrl }/index.php`, {
			params: {
				rest_route: `/wp/v2/plugins`,
				slug,
				status: active ? 'active' : 'inactive',
			},
			headers: {
				'X-WP-Nonce': this.nonce,
			},
		} );

		if ( ! response.ok() ) {
			throw new Error( `
				Failed to install a plugin: ${ response ? response.status() : '<no status>' }.
				${ response ? await response.text() : '<no response>' }
				slug: ${ slug }
			` );
		}
		const { plugin } = await response.json();

		return plugin;
	}

	public async deactivatePlugin( request: APIRequestContext, slug: string ) {
		const response = await request.post( `${ this.baseUrl }/index.php`, {
			params: {
				rest_route: `/wp/v2/plugins/${ slug }`,
				status: 'inactive',
			},
			headers: {
				'X-WP-Nonce': this.nonce,
			},
		} );
		if ( ! response.ok() ) {
			throw new Error( `
				Failed to deactivate a plugin: ${ response ? response.status() : '<no status>' }.
				${ response ? await response.text() : '<no response>' }
				slug: ${ slug }
			` );
		}
	}

	public async deleteTestUser( request: APIRequestContext, id ) {
		const response = await request.post( `${ this.baseUrl }/index.php`, {
			params: {
				rest_route: `/wp/v2/users/${ id }`,
			},
			headers: {
				'X-WP-Nonce': this.nonce,
			},
		} );
		if ( ! response.ok() ) {
			throw new Error( `
				Failed to delete user: ${ response ? response.status() : '<no status>' }.
				${ response ? await response.text() : '<no response>' }

			` );
		}
	}

	public async deletePlugin( request: APIRequestContext, slug: string ) {
		const response = await this._delete( request, 'plugins', slug );

		if ( ! response.ok() ) {
			throw new Error( `
				Failed to delete a plugin: ${ response ? response.status() : '<no status>' }.
				${ response ? await response.text() : '<no response>' }
				slug: ${ slug }
			` );
		}
	}

	public async getTheme( request: APIRequestContext, status?: 'active' | 'inactive' ) {
		return await this.get( request, 'themes', status );
	}

	public async customGet( request: APIRequestContext, restRoute: string, multipart? ) {
		const response = await request.get( `${ this.baseUrl }/${ restRoute }`, {
			headers: {
				'X-WP-Nonce': this.nonce,
			},
			multipart,
		} );

		if ( ! response.ok() ) {
			throw new Error( `
				Failed to get from ${ restRoute }: ${ response.status() }.
				${ this.baseUrl }
			` );
		}

		return await response.json();
	}

	public async customPut( request: APIRequestContext, restRoute: string, data ) {
		const response = await request.put( `${ this.baseUrl }/${ restRoute }`, {
			headers: {
				'X-WP-Nonce': this.nonce,
			},
			data,
		} );

		if ( ! response.ok() ) {
			throw new Error( `
				Failed to put to ${ restRoute }: ${ response.status() }.
				${ await response.text() }
			` );
		}
	}

	private async get( request: APIRequestContext, entity: string, status: string = 'publish' ) {
		const response = await request.get( `${ this.baseUrl }/index.php`, {
			params: {
				rest_route: `/wp/v2/${ entity }`,
				status,
			},
			headers: {
				'X-WP-Nonce': this.nonce,
			},
		} );

		if ( ! response.ok() ) {
			throw new Error( `
			Failed to get a ${ entity }: ${ response.status() }.
			${ await response.text() }
		` );
		}

		return await response.json();
	}

	private async getPages( request: APIRequestContext, status: string = 'publish' ) {
		return await this.get( request, 'pages', status );
	}

	private async deletePage( request: APIRequestContext, pageId: string , options ) {
		await this._delete( request, 'pages', pageId, options );
	}

	public async deleteUser( request: APIRequestContext, userId: string, options = { force: true, reassign: '-1' } ) {
		await this._delete( request, 'users', userId, options );
	}

	private async _delete( request: APIRequestContext, entity: string, id: string , options) {
		const response = await request.delete( `${ this.baseUrl }/index.php`, {
			params: {
				rest_route: `/wp/v2/${ entity }/${ id }`,
				...options
			},
			headers: {
				'X-WP-Nonce': this.nonce,
			},
		} );

		if ( ! response.ok() ) {
			throw new Error( `
			Failed to delete a ${ entity } with id '${ id }': ${ response.status() }.
			${ await response.text() }
		` );
		}

		return response;
	}

	public async createNewUser( request: APIRequestContext, user ) {
		const username = `${ user.username }${ Math.floor( Math.random() * 1000 ) }`,
			email = user.email || username + '@example.com',
			password = user.password || 'password',
			roles = user.roles;

		const response = await request.post( `${ this.baseUrl }/index.php`, {

			params: { rest_route: '/wp/v2/users' },
			headers: {
				'X-WP-Nonce': this.nonce,
			},
			multipart: {
				username,
				email,
				password,
				roles: roles,
			},
		} );

		if ( ! response.ok() ) {
			throw new Error( `
			Failed to create new user: ${ response.status() }.
			${ await response.text() }
		` );
		}

		const { id } = await response.json();

		return { id, username, password };
	}
}
