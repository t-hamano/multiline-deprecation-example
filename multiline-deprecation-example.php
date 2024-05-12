<?php
/**
 * Plugin Name:       Multiline Deprecation Example
 * Requires at least: 6.5
 * Requires PHP:      7.0
 * Version:           0.1.0
 */

function create_block_multiline_deprecation_example_block_init() {
	register_block_type( __DIR__ . '/build' );
}
add_action( 'init', 'create_block_multiline_deprecation_example_block_init' );
