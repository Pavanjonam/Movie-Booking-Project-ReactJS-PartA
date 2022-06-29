import React from "react";
import { makeStyles } from '@material-ui/core/styles';

import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';

import moviesData from "./moviesData";


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    gridList: {
        flexWrap: 'nowrap',
        transform: 'translateZ(0)',
    },
    title: {
        color: theme.palette.background.default,
    },

}));





export default function GridListBanner() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <GridList cellHeight={250} className={classes.gridList} cols={6}>
                {moviesData.map((tile) => (
                    <GridListTile key={tile.poster_url}>
                        <img src={tile.poster_url} />
                        <GridListTileBar
                            title={tile.title}
                            classes={{
                                root: classes.titleBar,
                                title: classes.title,
                            }}

                        />
                    </GridListTile>
                ))}
            </GridList>
        </div>
    );
}



