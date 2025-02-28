import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import LocalPostOfficeOutlinedIcon from '@mui/icons-material/LocalPostOfficeOutlined';

export default function InviteCard(props) {
    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardMedia
                component="img"
                width="358"
                height="426"
                image={props.inviteCard.imgUrl}
            />
            <CardActions sx={{ justifyContent: "space-between" }}>
                <div>
                    <Button size="small" startIcon={<LocalPostOfficeOutlinedIcon />}>청첩장 보기</Button>
                    <Button size="small" startIcon={<ContentCopyIcon />} sx={{ marginLeft: "10px" }}>링크 복사</Button>
                </div>
                <IconButton aria-label="delete" color="error"><DeleteOutlinedIcon /></IconButton>
            </CardActions>
        </Card>
    );
}
