import React from 'react';

function DndProps(theme,dragComponent,DndStyles,collapsed,index,titleComponent){

const Collapsed = collapsed === true ? true : false;

    const DndProps = {
        title:false,
        titleComponent:titleComponent,
        collapsed:Collapsed,
        collapsedIndex:index,

        info:{
            pageName: "DndProps",
            shortName: "Modules",
            childShortName: "Activity"
        },
    
        DndColumnTitles:[
            {column1: "Column 1"},
            {column2: "Column 2"},
        ],
    
        DndDragedComponent: dragComponent,
    
        DndStyles: DndStyles() ,
    
        DndParentFunctions: {},
    
        DndApiRoutes: {}
    
    };


  return DndProps
}

export default DndProps