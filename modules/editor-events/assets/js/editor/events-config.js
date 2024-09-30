const eventsConfig = {
	triggers: {
		click: 'Click',
		accordionClick: 'Accordion Click',
		toggleClick: 'Toggle Click',
		dropdownClick: 'Click Dropdown',
		toggle: 'Toggle'
	},

	locations: {
		widgetPanel: 'Widget Panel',
		topBar: 'Top Bar',
		elementorEditor: 'Elementor Editor'
	},

	secondaryLocations: {
		layout: 'Layout Section',
		basic: 'Basic Section',
		'pro-elements': 'Pro Section',
		general: 'General Section',
		'theme-elements': 'Site Section',
		'theme-elements-single': 'Single Section',
		'woocommerce-elements': 'WooCommerce Section',
		wordpress: 'WordPress Section',
		categories: 'Widgets Tab',
		global: 'Globals Tab',
		'whats-new': 'What’s New',
		'document-settings': 'Document Settings icon',
		'preview-page': 'Preview Page',
		'publish-button': 'Publish Button',
		'widget-panel': 'Widget Panel Icon',
		finder: 'Finder',
		help: 'Help',
		elementorLogoDropdown: 'top_bar_elementor_logo_dropdown',
		elementorLogo: 'Elementor Logo',
		notes: 'Notes',
		siteSettings: 'Site Settings',
		structure: 'Structure',
		documentNameDropdown: 'Document Name dropdown',
		responsiveControls: 'Responsive controls',
		launchpad: 'launchpad',
		checklistHeader: 'Checklist Header',
		checklistSteps: 'Checklist Steps',
		userPreferences: 'User Preferences'
	},

	elements: {
		accordionSection: 'Accordion section',
		buttonIcon: 'Button Icon',
		mainCta: 'Main CTA',
		link: 'Link',
		dropdown: 'Dropdown',
	},

	names: {
		v1: {
			layout: 'v1_widgets_tab_layout_section',
			basic: 'v1_widgets_tab_basic_section',
			'pro-elements': 'v1_widgets_tab_pro_section',
			general: 'v1_widgets_tab_general_section',
			'theme-elements': 'v1_widgets_tab_site_section',
			'theme-elements-single': 'v1_widgets_tab_single_section',
			'woocommerce-elements': 'v1_widgets_tab_woocommerce_section',
			wordpress: 'v1_widgets_tab_wordpress_section',
			categories: 'v1_widgets_tab',
			global: 'v1_globals_tab',
		},
		topBar: {
			whatsNew: 'top_bar_whats_new',
			documentSettings: 'top_bar_document_settings_icon',
			previewPage: 'top_bar_preview_page',
			publishButton: 'top_bar_publish_button',
			widgetPanel: 'top_bar_widget_panel_icon',
			finder: 'top_bar_finder',
			help: 'top_bar_help',
			history: 'top_bar_elementor_logo_dropdown_history',
			userPreferences: 'top_bar_elementor_logo_dropdown_user_preferences',
			keyboardShortcuts: 'top_bar_elementor_logo_dropdown_keyboard_shortcuts',
			exitToWordpress: 'top_bar_elementor_logo_dropdown_exit_to_wordpress',
			themeBuilder: 'top_bar_elementor_logo_dropdown_theme_builder',
			notes: 'top_bar_notes',
			siteSettings: 'top_bar_site_setting',
			structure: 'top_bar_structure',
			documentNameDropdown: 'top_bar_document_name_dropdown',
			responsiveControls: 'top_bar_responsive_controls',
			launchpad: 'top_bar_launchpad_icon',
		},
		elementorEditor: {
			checklistHeaderClose: 'checklist_header_close_icon',
			checklistSteps: {
				title: {
					'add_logo': 'checklist_step_title_addlogo',
					'assign_homepage': 'checklist_step_title_assignhomepage',
					'create_pages': 'checklist_step_title_create3pages',
					'set_fonts_and_colors': 'checklist_step_title_createglobal',
					'setup_header': 'checklist_step_title_createheader',
				},
				action: {
					'add_logo': 'checklist_step_action_addlogo',
					'assign_homepage': 'checklist_step_action_assignhomepage',
					'create_pages': 'checklist_step_action_create3pages',
					'set_fonts_and_colors': 'checklist_step_action_createglobal',
					'setup_header': 'checklist_step_action_createheader',
					'well_done': 'checklist_step_action_welldone',
				},
				done: {
					'add_logo': 'checklist_step_done_addlogo',
					'assign_homepage': 'checklist_step_done_assignhomepage',
					'create_pages': 'checklist_step_done_create3pages',
					'set_fonts_and_colors': 'checklist_step_done_createglobal',
					'setup_header': 'checklist_step_done_createheader',
				},
				undone: {
					'add_logo': 'checklist_step_undone_addlogo',
					'assign_homepage': 'checklist_step_undone_assignhomepage',
					'create_pages': 'checklist_step_undone_create3pages',
					'set_fonts_and_colors': 'checklist_step_undone_createglobal',
					'setup_header': 'checklist_step_undone_createheader',
				},
				upgrade: {

				},
			}
		},
	},
};

export default eventsConfig;
