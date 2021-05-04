import React, { useState, useEffect } from 'react';
import { Container, Chip, Grid, Button, Divider, TextField, Snackbar } from '@material-ui/core';
import Axios from 'axios';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const Index = (props) => {

    const [list, setList] = useState([{ id: 1, content: '暂无数据', }])
    const [input, setInput] = useState('')
    const [open, setOpen] = useState(false)
    const [message, setMessage] = useState('')

    useEffect(() => {
        return () => {
            Axios.get("/api/get_all_clipboard").then((response) => {
                if (response.data === [] || response.data === '') {
                    setList([{ id: 1, content: '暂无数据' }])
                } else {
                    setList(response.data)
                }
            })
        }
    }, [list])

    const add = () => {
        Axios.get('/api/add_clipboard', { params: { content: input } }).then(
            (response) => {
                if (response.data) {
                    setOpen(true)
                }
                Axios.get("/api/get_all_clipboard").then((response) => {
                    if (response.data === [] || response.data === '') {
                        setList([{ id: 1, content: '暂无数据' }])
                    } else {
                        setList(response.data)
                    }
                })
            }
        )
        setMessage('添加成功')
        setOpen(true)
    }

    const onDeleteEvent = (index, id) => {
        list.splice(index, 1)
        setList(list)
        Axios.get("/api/remove_clipboard", { params: { id: id } }).then(
            (response) => {
                Axios.get("/api/get_all_clipboard").then((response) => {
                    if (response.data === [] || response.data === '') {
                        setList([{ id: 1, content: '暂无数据' }])
                    } else {
                        setList(response.data)
                    }
                })
            }
        )
        setMessage('删除成功')
        setOpen(true)
    }

    return (
        <Container maxWidth='sm'>
            <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                open={open}
                message={message}
                onClose={() => setOpen(false)}
                key={'topcenter'}
                autoHideDuration={1000}
            ></Snackbar>
            <Chip label={props.title}></Chip>
            <Grid container spacing={3} justify='center' alignItems="center">
                <Grid item xs={4}>
                    <TextField value={input} label='在这里输入' onChange={(e) => { setInput(e.target.value) }}></TextField>
                </Grid>
                <Grid item xs={3}>
                    <Button variant="contained" color='primary' onClick={() => { add() }}>添加</Button>
                </Grid>
                <Grid item xs={12}>
                    <Divider variant="middle" />
                </Grid>
                <Grid item xs={12}>
                    {list.map((v, index) =>
                        <CopyToClipboard text={v.content} key={v.id}>
                            <Chip label={v.content} variant="outlined" onDelete={() => { onDeleteEvent(index, v.id) }} />
                        </CopyToClipboard>
                    )}
                </Grid>
            </Grid>
        </Container>
    );
}
export default Index