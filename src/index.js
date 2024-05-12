import { registerBlockType, createBlock, rawHandler } from '@wordpress/blocks';
import {
	useBlockProps,
	useInnerBlocksProps,
	InnerBlocks,
	RichText,
} from '@wordpress/block-editor';

function migrateToList( attributes ) {
	const { content } = attributes;
	const list = document.createElement( 'ul' );
	list.innerHTML = content;
	const [ listBlock ] = rawHandler( { HTML: list.outerHTML } );
	return [
		{},
		listBlock.innerBlocks,
	];
}

registerBlockType( 'gutenberg/migrate-multiline-to-innerblocks', {
	title: 'Multiline Deprecation Example',
	deprecated: [
		{
			attributes: {
				content: {
					type: 'string',
					source: 'html',
					selector: 'ul',
					multiline: 'li',
				},
			},
			save: ( props ) => {
				const { attributes } = props;
				if ( RichText.isEmpty( attributes.content ) ) {
					return null;
				}
				return (
					<div { ...useBlockProps.save() }>
						<RichText.Content
							tagName="ul"
							value={ attributes.content }
						/>
					</div>
				);
			},
			migrate: migrateToList,
		},
	],
	edit: () => {
		const innerBlocksProps = useInnerBlocksProps( useBlockProps(), {
			template: [ [ 'core/list-item' ] ],
			allowedBlocks: [ 'core/list-item' ],
		} );
		return (
			<div { ...useBlockProps() }>
				<ul { ...innerBlocksProps } />
			</div>
		);
	},
	save: () => {
		return (
			<div { ...useBlockProps.save() }>
				<ul>
					<InnerBlocks.Content />
				</ul>
			</div>
		);
	},
} );
