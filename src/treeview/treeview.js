import Comment from './comment';
import { CommentService } from './comment-service';

var template = (function () {
  let commentService = new CommentService();
  
  return {
    onrender() {
      commentService.getComments()
                    .then((data) => {
                      console.log(data);  
                      this.set({allComments: data});
                    });
    },

    data () {
      return {
        allComments: []
      };
    },

    components: {
      Comment
    }
  };

}());

function renderMainFragment ( root, component ) {
	var div = createElement( 'div' );
	div.className = "comment-section";
	
	var ul = createElement( 'ul' );
	
	appendNode( ul, div );
	var eachBlock_anchor = createComment( "#each allComments" );
	appendNode( eachBlock_anchor, ul );
	var eachBlock_value = root.allComments;
	var eachBlock_iterations = [];
	
	for ( var i = 0; i < eachBlock_value.length; i += 1 ) {
		eachBlock_iterations[i] = renderEachBlock( root, eachBlock_value, eachBlock_value[i], i, component );
		eachBlock_iterations[i].mount( eachBlock_anchor.parentNode, eachBlock_anchor );
	}

	return {
		mount: function ( target, anchor ) {
			insertNode( div, target, anchor );
		},
		
		update: function ( changed, root ) {
			var eachBlock_value = root.allComments;
			
			for ( var i = 0; i < eachBlock_value.length; i += 1 ) {
				if ( !eachBlock_iterations[i] ) {
					eachBlock_iterations[i] = renderEachBlock( root, eachBlock_value, eachBlock_value[i], i, component );
					eachBlock_iterations[i].mount( eachBlock_anchor.parentNode, eachBlock_anchor );
				} else {
					eachBlock_iterations[i].update( changed, root, eachBlock_value, eachBlock_value[i], i );
				}
			}
			
			for ( var i = eachBlock_value.length; i < eachBlock_iterations.length; i += 1 ) {
				eachBlock_iterations[i].teardown( true );
			}
			
			eachBlock_iterations.length = eachBlock_value.length;
		},
		
		teardown: function ( detach ) {
			for ( var i = 0; i < eachBlock_iterations.length; i += 1 ) {
				eachBlock_iterations[i].teardown( false );
			}
			
			if ( detach ) {
				detachNode( div );
			}
		},
	};
}

function renderEachBlock ( root, eachBlock_value, c1, c1__index, component ) {
	var li = createElement( 'li' );
	
	var comment_initialData = {
		comment: c1
	};
	var comment = new template.components.Comment({
		target: li,
		_root: component._root || component,
		data: comment_initialData
	});
	
	appendNode( createText( "\n      " ), li );
	
	var ul = createElement( 'ul' );
	
	appendNode( ul, li );
	var eachBlock1_anchor = createComment( "#each c1.children" );
	appendNode( eachBlock1_anchor, ul );
	var eachBlock1_value = c1.children;
	var eachBlock1_iterations = [];
	
	for ( var i = 0; i < eachBlock1_value.length; i += 1 ) {
		eachBlock1_iterations[i] = renderEachBlock1( root, eachBlock_value, c1, c1__index, eachBlock1_value, eachBlock1_value[i], i, component );
		eachBlock1_iterations[i].mount( eachBlock1_anchor.parentNode, eachBlock1_anchor );
	}

	return {
		mount: function ( target, anchor ) {
			insertNode( li, target, anchor );
		},
		
		update: function ( changed, root, eachBlock_value, c1, c1__index ) {
			var c1 = eachBlock_value[c1__index];
			
			var comment_changes = {};
			
			if ( 'allComments' in changed ) comment_changes.comment = c1;
			
			if ( Object.keys( comment_changes ).length ) comment.set( comment_changes );
			
			var eachBlock1_value = c1.children;
			
			for ( var i = 0; i < eachBlock1_value.length; i += 1 ) {
				if ( !eachBlock1_iterations[i] ) {
					eachBlock1_iterations[i] = renderEachBlock1( root, eachBlock_value, c1, c1__index, eachBlock1_value, eachBlock1_value[i], i, component );
					eachBlock1_iterations[i].mount( eachBlock1_anchor.parentNode, eachBlock1_anchor );
				} else {
					eachBlock1_iterations[i].update( changed, root, eachBlock_value, c1, c1__index, eachBlock1_value, eachBlock1_value[i], i );
				}
			}
			
			for ( var i = eachBlock1_value.length; i < eachBlock1_iterations.length; i += 1 ) {
				eachBlock1_iterations[i].teardown( true );
			}
			
			eachBlock1_iterations.length = eachBlock1_value.length;
		},
		
		teardown: function ( detach ) {
			comment.teardown( false );
			
			for ( var i = 0; i < eachBlock1_iterations.length; i += 1 ) {
				eachBlock1_iterations[i].teardown( false );
			}
			
			if ( detach ) {
				detachNode( li );
			}
		},
	};
}

function renderEachBlock1 ( root, eachBlock_value, c1, c1__index, eachBlock1_value, c2, c2__index, component ) {
	var li = createElement( 'li' );
	
	var comment_initialData = {
		comment: c2
	};
	var comment = new template.components.Comment({
		target: li,
		_root: component._root || component,
		data: comment_initialData
	});
	
	appendNode( createText( "\n          " ), li );
	
	var ul = createElement( 'ul' );
	
	appendNode( ul, li );
	var eachBlock2_anchor = createComment( "#each c2.children" );
	appendNode( eachBlock2_anchor, ul );
	var eachBlock2_value = c2.children;
	var eachBlock2_iterations = [];
	
	for ( var i = 0; i < eachBlock2_value.length; i += 1 ) {
		eachBlock2_iterations[i] = renderEachBlock2( root, eachBlock_value, c1, c1__index, eachBlock1_value, c2, c2__index, eachBlock2_value, eachBlock2_value[i], i, component );
		eachBlock2_iterations[i].mount( eachBlock2_anchor.parentNode, eachBlock2_anchor );
	}

	return {
		mount: function ( target, anchor ) {
			insertNode( li, target, anchor );
		},
		
		update: function ( changed, root, eachBlock_value, c1, c1__index, eachBlock1_value, c2, c2__index ) {
			var c1 = eachBlock_value[c1__index];
			var c2 = eachBlock1_value[c2__index];
			
			var comment_changes = {};
			
			if ( 'allComments' in changed ) comment_changes.comment = c2;
			
			if ( Object.keys( comment_changes ).length ) comment.set( comment_changes );
			
			var eachBlock2_value = c2.children;
			
			for ( var i = 0; i < eachBlock2_value.length; i += 1 ) {
				if ( !eachBlock2_iterations[i] ) {
					eachBlock2_iterations[i] = renderEachBlock2( root, eachBlock_value, c1, c1__index, eachBlock1_value, c2, c2__index, eachBlock2_value, eachBlock2_value[i], i, component );
					eachBlock2_iterations[i].mount( eachBlock2_anchor.parentNode, eachBlock2_anchor );
				} else {
					eachBlock2_iterations[i].update( changed, root, eachBlock_value, c1, c1__index, eachBlock1_value, c2, c2__index, eachBlock2_value, eachBlock2_value[i], i );
				}
			}
			
			for ( var i = eachBlock2_value.length; i < eachBlock2_iterations.length; i += 1 ) {
				eachBlock2_iterations[i].teardown( true );
			}
			
			eachBlock2_iterations.length = eachBlock2_value.length;
		},
		
		teardown: function ( detach ) {
			comment.teardown( false );
			
			for ( var i = 0; i < eachBlock2_iterations.length; i += 1 ) {
				eachBlock2_iterations[i].teardown( false );
			}
			
			if ( detach ) {
				detachNode( li );
			}
		},
	};
}

function renderEachBlock2 ( root, eachBlock_value, c1, c1__index, eachBlock1_value, c2, c2__index, eachBlock2_value, c3, c3__index, component ) {
	var li = createElement( 'li' );
	
	var comment_initialData = {
		comment: c3
	};
	var comment = new template.components.Comment({
		target: li,
		_root: component._root || component,
		data: comment_initialData
	});
	
	appendNode( createText( "\n              " ), li );
	
	var ul = createElement( 'ul' );
	
	appendNode( ul, li );
	var eachBlock3_anchor = createComment( "#each c3.children" );
	appendNode( eachBlock3_anchor, ul );
	var eachBlock3_value = c3.children;
	var eachBlock3_iterations = [];
	
	for ( var i = 0; i < eachBlock3_value.length; i += 1 ) {
		eachBlock3_iterations[i] = renderEachBlock3( root, eachBlock_value, c1, c1__index, eachBlock1_value, c2, c2__index, eachBlock2_value, c3, c3__index, eachBlock3_value, eachBlock3_value[i], i, component );
		eachBlock3_iterations[i].mount( eachBlock3_anchor.parentNode, eachBlock3_anchor );
	}

	return {
		mount: function ( target, anchor ) {
			insertNode( li, target, anchor );
		},
		
		update: function ( changed, root, eachBlock_value, c1, c1__index, eachBlock1_value, c2, c2__index, eachBlock2_value, c3, c3__index ) {
			var c1 = eachBlock_value[c1__index];
			var c2 = eachBlock1_value[c2__index];
			var c3 = eachBlock2_value[c3__index];
			
			var comment_changes = {};
			
			if ( 'allComments' in changed ) comment_changes.comment = c3;
			
			if ( Object.keys( comment_changes ).length ) comment.set( comment_changes );
			
			var eachBlock3_value = c3.children;
			
			for ( var i = 0; i < eachBlock3_value.length; i += 1 ) {
				if ( !eachBlock3_iterations[i] ) {
					eachBlock3_iterations[i] = renderEachBlock3( root, eachBlock_value, c1, c1__index, eachBlock1_value, c2, c2__index, eachBlock2_value, c3, c3__index, eachBlock3_value, eachBlock3_value[i], i, component );
					eachBlock3_iterations[i].mount( eachBlock3_anchor.parentNode, eachBlock3_anchor );
				} else {
					eachBlock3_iterations[i].update( changed, root, eachBlock_value, c1, c1__index, eachBlock1_value, c2, c2__index, eachBlock2_value, c3, c3__index, eachBlock3_value, eachBlock3_value[i], i );
				}
			}
			
			for ( var i = eachBlock3_value.length; i < eachBlock3_iterations.length; i += 1 ) {
				eachBlock3_iterations[i].teardown( true );
			}
			
			eachBlock3_iterations.length = eachBlock3_value.length;
		},
		
		teardown: function ( detach ) {
			comment.teardown( false );
			
			for ( var i = 0; i < eachBlock3_iterations.length; i += 1 ) {
				eachBlock3_iterations[i].teardown( false );
			}
			
			if ( detach ) {
				detachNode( li );
			}
		},
	};
}

function renderEachBlock3 ( root, eachBlock_value, c1, c1__index, eachBlock1_value, c2, c2__index, eachBlock2_value, c3, c3__index, eachBlock3_value, c4, c4__index, component ) {
	var li = createElement( 'li' );
	
	var comment_initialData = {
		comment: c4
	};
	var comment = new template.components.Comment({
		target: li,
		_root: component._root || component,
		data: comment_initialData
	});

	return {
		mount: function ( target, anchor ) {
			insertNode( li, target, anchor );
		},
		
		update: function ( changed, root, eachBlock_value, c1, c1__index, eachBlock1_value, c2, c2__index, eachBlock2_value, c3, c3__index, eachBlock3_value, c4, c4__index ) {
			var c1 = eachBlock_value[c1__index];
			var c2 = eachBlock1_value[c2__index];
			var c3 = eachBlock2_value[c3__index];
			var c4 = eachBlock3_value[c4__index];
			
			var comment_changes = {};
			
			if ( 'allComments' in changed ) comment_changes.comment = c4;
			
			if ( Object.keys( comment_changes ).length ) comment.set( comment_changes );
		},
		
		teardown: function ( detach ) {
			comment.teardown( false );
			
			if ( detach ) {
				detachNode( li );
			}
		},
	};
}

function treeview ( options ) {
	options = options || {};
	
	this._state = Object.assign( template.data(), options.data );

	this._observers = {
		pre: Object.create( null ),
		post: Object.create( null )
	};

	this._handlers = Object.create( null );

	this._root = options._root;
	this._yield = options._yield;

	this._renderHooks = [];
	
	this._fragment = renderMainFragment( this._state, this );
	if ( options.target ) this._fragment.mount( options.target, null );
	
	while ( this._renderHooks.length ) {
		var hook = this._renderHooks.pop();
		hook.fn.call( hook.context );
	}
	
	if ( options._root ) {
		options._root._renderHooks.push({ fn: template.onrender, context: this });
	} else {
		template.onrender.call( this );
	}
}

treeview.prototype.get = function get( key ) {
 	return key ? this._state[ key ] : this._state;
 };

treeview.prototype.fire = function fire( eventName, data ) {
 	var handlers = eventName in this._handlers && this._handlers[ eventName ].slice();
 	if ( !handlers ) return;
 
 	for ( var i = 0; i < handlers.length; i += 1 ) {
 		handlers[i].call( this, data );
 	}
 };

treeview.prototype.observe = function observe( key, callback, options ) {
 	var group = ( options && options.defer ) ? this._observers.pre : this._observers.post;
 
 	( group[ key ] || ( group[ key ] = [] ) ).push( callback );
 
 	if ( !options || options.init !== false ) {
 		callback.__calling = true;
 		callback.call( this, this._state[ key ] );
 		callback.__calling = false;
 	}
 
 	return {
 		cancel: function () {
 			var index = group[ key ].indexOf( callback );
 			if ( ~index ) group[ key ].splice( index, 1 );
 		}
 	};
 };

treeview.prototype.on = function on( eventName, handler ) {
 	var handlers = this._handlers[ eventName ] || ( this._handlers[ eventName ] = [] );
 	handlers.push( handler );
 
 	return {
 		cancel: function () {
 			var index = handlers.indexOf( handler );
 			if ( ~index ) handlers.splice( index, 1 );
 		}
 	};
 };

treeview.prototype.set = function set ( newState ) {
	var oldState = this._state;
	this._state = Object.assign( {}, oldState, newState );
	
	dispatchObservers( this, this._observers.pre, newState, oldState );
	if ( this._fragment ) this._fragment.update( newState, this._state );
	dispatchObservers( this, this._observers.post, newState, oldState );
	
	while ( this._renderHooks.length ) {
		var hook = this._renderHooks.pop();
		hook.fn.call( hook.context );
	}
};

treeview.prototype.teardown = function teardown ( detach ) {
	this.fire( 'teardown' );

	this._fragment.teardown( detach !== false );
	this._fragment = null;

	this._state = {};
};

function dispatchObservers( component, group, newState, oldState ) {
	for ( var key in group ) {
		if ( !( key in newState ) ) continue;

		var newValue = newState[ key ];
		var oldValue = oldState[ key ];

		if ( newValue === oldValue && typeof newValue !== 'object' ) continue;

		var callbacks = group[ key ];
		if ( !callbacks ) continue;

		for ( var i = 0; i < callbacks.length; i += 1 ) {
			var callback = callbacks[i];
			if ( callback.__calling ) continue;

			callback.__calling = true;
			callback.call( component, newValue, oldValue );
			callback.__calling = false;
		}
	}
}

function createElement( name ) {
	return document.createElement( name );
}

function detachNode( node ) {
	node.parentNode.removeChild( node );
}

function insertNode( node, target, anchor ) {
	target.insertBefore( node, anchor );
}

function appendNode( node, target ) {
	target.appendChild( node );
}

function createComment( data ) {
	return document.createComment( data );
}

function createText( data ) {
	return document.createTextNode( data );
}

export default treeview;