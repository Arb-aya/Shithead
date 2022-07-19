/**
 * Allows game components to dynamically select icons to use based on props.
 * Whilst also being optimized by webpack.
 */

const ICONS = require.context('@/assets',true);

export default function(){
    return ICONS;
}