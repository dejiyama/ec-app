import React from 'react'
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate'
import IconButton from '@material-ui/core/IconButton'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles ({
    icon: {
        height: 48,
        width: 48
    }
})
const ImageArea = () => {
    const classes = useStyles()

    return (
        <div>
            <div>
                <span>商品画像を登録する</span>
                <IconButton className={classes.icon}>
                    {/* 画像をクリックした時にPCないの画像を選択できるエクスぷローダーを表示させるためには、labelで反応させたいものを囲む */}
                    <label>
                        <AddPhotoAlternateIcon />
                        <input className="u-display-none" type="file" id="image"/>
                    </label>
                </IconButton>
            </div>
        </div>
    )

}

export default ImageArea