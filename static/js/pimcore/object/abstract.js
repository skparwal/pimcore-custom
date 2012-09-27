/**
 * Pimcore
 *
 * LICENSE
 *
 * This source file is subject to the new BSD license that is bundled
 * with this package in the file LICENSE.txt.
 * It is also available through the world-wide-web at this URL:
 * http://www.pimcore.org/license 
 *
 * @copyright  Copyright (c) 2009-2010 elements.at New Media Solutions GmbH (http://www.elements.at)
 * @license    http://www.pimcore.org/license     New BSD License
 */

pimcore.registerNS("pimcore.object.abstract");
pimcore.object.abstract = Class.create(pimcore.element.abstract, {


    addLoadingPanel : function () {

        // DEPRECIATED loadingpanel not active
        return;
    },


    removeLoadingPanel: function () {
        pimcore.helpers.removeTreeNodeLoadingIndicator("object", this.id);
    },


    checkLoadingStatus: function () {

        // DEPRECIATED loadingpanel not active
        return;
    },


    selectInTree: function (type) {

        if(type != "variant") {
            try {
				//customview path
				var customTreeMatch = false;
				if (type == "object") {
					//@NOTICE this is a bit hacky :)
					//the trees do not have their childs loaded until the path to them is expanded
					//so there is no way (?) to check if the node is present in one of the customviews
					//but we can explode the object path and if some ID matches some custom view tree rootId
					//we use that tree
					var tmpIDs = this.data.idPath.split('/');
					for (var cvs = 0; cvs < pimcore.settings.customviews.length; cvs++) {
						cv = pimcore.settings.customviews[cvs];
						if (tmpIDs.length > 0 && tmpIDs.indexOf(cv.rootId.toString()) > -1) {
							//calculate the path to expand on the custom view tree
							var cvNodePath = this.data.idPath.substr(this.data.idPath.indexOf("/"+cv.rootId.toString()+"/"));
							Ext.getCmp("pimcore_panel_tree_customviews_"+cv.id).expand();
							var tree = pimcore.globalmanager.get("layout_customview_tree_"+cv.id);
							pimcore.helpers.selectPathInTree(tree.tree, cvNodePath);
							customTreeMatch = true;
							break;
						}
					}
				}
				//object tree path
				if (!customTreeMatch) {
					Ext.getCmp("pimcore_panel_tree_objects").expand();
					var tree = pimcore.globalmanager.get("layout_object_tree");
					pimcore.helpers.selectPathInTree(tree.tree, this.data.idPath);
				}
            } catch (e) {
                console.log(e);
            }
        }
    }
});