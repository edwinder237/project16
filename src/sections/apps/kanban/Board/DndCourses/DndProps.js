import React from 'react';

function DndProps(theme,dragComponent,DndStyles,titleComponent){


    const DndProps = {
        titleComponent:titleComponent,
        collapsed:false,
        info:{
            pageName: "DndProps",
            shortName: "Course",
            childShortName: "Module"
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