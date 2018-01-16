export interface DisplayListItem {
	getId(): number;
}

export class DisplayListItemData {
	closed: boolean;
	hidden: boolean;
	order: number;

	constructor() {
		this.closed = false;
		this.hidden = false;
		this.order = -1;
	}
}

export class DisplayListItemUtil {
	static orderList<T extends DisplayListItem>( items: T[], itemData: { [ key: number ]: DisplayListItemData } ): T[] {
		let result = new Array<T>( items.length );
		for ( let i = 0; i < items.length; i++ ) {
			const item = items[ i ];
			const data = itemData[ item.getId() ];
			let index = -1;
			if ( data != null ) {
				index = data.order;
			}
			if ( index < 0 || result[ index ] != null ) {
				// add at the end
				result.push( item );
			} else {
				result[ index ] = item;
			}
		}
		result = result.filter( function( n ) { return n != undefined; } );
		return result;
	}

	static setOrder( itemData: { [ key: number ]: DisplayListItemData }, key: number, order: number ): void {
		const data = DisplayListItemUtil.getOrCreateItemData( itemData, key );
		data.order = order;
	}

	static setClosed( itemData: { [ key: number ]: DisplayListItemData }, key: number, closed: boolean ): void {
		const data = DisplayListItemUtil.getOrCreateItemData( itemData, key );
		data.closed = closed;
	}

	static setHidden( itemData: { [ key: number ]: DisplayListItemData }, key: number, hidden: boolean ): void {
		const data = DisplayListItemUtil.getOrCreateItemData( itemData, key );
		data.hidden = hidden;
	}

	private static getOrCreateItemData( itemData: { [ key: number ]: DisplayListItemData }, key: number ): DisplayListItemData {
		let data = itemData[ key ];
		if ( data == null ) {
			data = new DisplayListItemData();
			itemData[ key ] = data;
		}
		return data;
	}
}

export interface DisplayListDragParent<T extends DisplayListItem> {
	getMapOfDisplayItemData(): { [ key: number ]: DisplayListItemData };
	getDisplayList(): T[];
	setDisplayList( newList: T[] );
}

export class DisplayListDragHandler<T extends DisplayListItem> {
	private dragSource: any;

	constructor( private parent: DisplayListDragParent<T> ) {
	}

	private getInsertBefore( a, b ): any {
		if ( a.parentNode == b.parentNode ) {
			for ( let cur = a; cur; cur = cur.previousSibling ) {
				if ( cur === b ) {
					return b;
				}
			}
		}
		return b.nextSibling;
	}

	dragenter( $event ): void {
		const target = $event.currentTarget;
		const insertBefore = this.getInsertBefore( this.dragSource, target );
		target.parentNode.insertBefore( this.dragSource, insertBefore );
	}

	dragstart( $event ): void {
		this.dragSource = $event.currentTarget;
		$event.dataTransfer.effectAllowed = 'move';
	}

	dragend( $event ): void {
		const previousSibling = this.dragSource.previousElementSibling;
		const children = this.dragSource.parentElement.children;

		const dataMap = this.parent.getMapOfDisplayItemData();
		let displayList = this.parent.getDisplayList();

		for ( let index = 0; index < children.length; index++ ) {
			const child = children[ index ];
			child.setAttribute( 'data-index', index );
			const id = child.getAttribute( 'data-id' );
			DisplayListItemUtil.setOrder( dataMap, id, index );
		}
		displayList = DisplayListItemUtil.orderList( displayList, dataMap );
		this.parent.setDisplayList( displayList );
		// this.saveSettings();
	}
}
