<?php
namespace Elementor\Tests\Phpunit\Elementor\Modules\Home\Transformations;

use Elementor\Modules\Home\Transformations\Generate_Sidebar_Upgrade;
use PHPUnit\Framework\TestCase as PHPUnit_TestCase;

class Test_Generate_Sidebar_Upgrade extends PHPUnit_TestCase {

	public function test_transform__core_plugin() {
		// Arrange
		$original_data = $this->mock_home_screen_data();

		$transformation = new Generate_Sidebar_Upgrade( [] );

		// Act
		$transformed_data = $transformation->transform( $original_data );
		$expected_data = $this->mock_home_screen_data_transformed_core();

		// Assert
		$this->assertTrue( $transformed_data === $expected_data );
	}

	public function test_transform__pro_plugin() {
		// Arrange
		$original_data = $this->mock_home_screen_data();

		$transformation = new Generate_Sidebar_Upgrade( [] );

		$transformation->has_pro = true;

		// Act
		$transformed_data = $transformation->transform( $original_data );
		$expected_data = $this->mock_home_screen_data_transformed_pro();

		// Assert
		$this->assertTrue( $transformed_data === $expected_data );
	}

	public function test_transform__core_empty() {
		// Arrange
		$original_data = $this->mock_home_screen_data_empty();

		$transformation = new Generate_Sidebar_Upgrade( [] );

		// Act
		$transformed_data = $transformation->transform( $original_data );
		$expected_data = $this->mock_home_screen_data_transformed();

		// Assert
		$this->assertTrue( $transformed_data === $expected_data );
	}

	private function mock_home_screen_data() {
		return [
			'sidebar_upgrade' => [
				[
					'header' => [
					'title' => 'value',
					],
					'thing' => [
						'key' => 'value',
					],
					'license' => [
						'free'
					],
					],
				['header' => [
					'title' => 'value',
				],
					'thing' => [
						'key' => 'value',
					],
					'license' => [
						"essential-empty",
						"essential-essential-oct2023",
						"advanced-empty"
					],
					],
			],
			'misc' => [
				'Name' => 'Microsoft',
				'Version' => 'Windows',
			],
		];
	}

	private function mock_home_screen_data_empty() {
		return [
			'sidebar_upgrade' => [
				[
					'header' => [
						'title' => '',
					],
					'thing' => [
						'key' => '',
					],
					'license' => [
						'free'
					],
				],
				['header' => [
					'title' => 'value',
				],
					'thing' => [
						'key' => 'value',
					],
					'license' => [
						"essential-empty",
						"essential-essential-oct2023",
						"advanced-empty"
					],
				],
			],
			'misc' => [
				'Name' => 'Microsoft',
				'Version' => 'Windows',
			],
		];
	}

	private function mock_home_screen_data_transformed() {
		return [
			'misc' => [
				'Name' => 'Microsoft',
				'Version' => 'Windows',
			],
		];
	}

	private function mock_home_screen_data_transformed_core() {
		return [
			'sidebar_upgrade' => [
				[
					'header' => [
						'title' => 'value',
					],
					'thing' => [
						'key' => 'value',
					],
					'license' => [
						'free'
					],
				],
			],
			'misc' => [
				'Name' => 'Microsoft',
				'Version' => 'Windows',
			],
		];
	}

	private function mock_home_screen_data_transformed_pro() {
		return [
			'sidebar_upgrade' => [
				[
					'header' => [
						'title' => 'value',
					],
					'thing' => [
						'key' => 'value',
					],
					'license' => [
						"essential-empty",
						"essential-essential-oct2023",
						"advanced-empty"
					],
				],
			],
			'misc' => [
				'Name' => 'Microsoft',
				'Version' => 'Windows',
			],
		];
	}
}
