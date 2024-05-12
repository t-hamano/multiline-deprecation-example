import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps, RichText } from '@wordpress/block-editor';

registerBlockType( 'gutenberg/migrate-multiline-to-innerblocks', {
	title: 'Multiline Deprecation Example',
	attributes: {
		content: {
			type: 'string',
			source: 'html',
			selector: 'ul',
			multiline: 'li',
		},
	},
	edit: ( props ) => {
		const { attributes, setAttributes } = props;
		return (
			<div { ...useBlockProps() }>
				<RichText
					tagName="ul"
					multiline="li"
					value={ attributes.content }
					onChange={ ( newContent ) => {
						setAttributes( { content: newContent } );
					} }
				/>
			</div>
		);
	},
	save: ( props ) => {
		const { attributes } = props;
		if ( RichText.isEmpty( attributes.content ) ) {
			return null;
		}
		return (
			<div { ...useBlockProps.save() }>
				<RichText.Content tagName="ul" value={ attributes.content } />
			</div>
		);
	},
} );
