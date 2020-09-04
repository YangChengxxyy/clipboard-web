import React from 'react';
import { Container, Chip, Grid, Button, Divider, TextField, Tooltip } from '@material-ui/core';
import Axios from 'axios';
import { CopyToClipboard } from 'react-copy-to-clipboard';
class Index extends React.Component {
    constructor() {
        super()
        this.state = {
            list: [{ id: 1, content: '暂无数据', }],
            input: ''
        }
        Axios.get("/api/get_all_clipboard").then((response) => {
            if (response.data === [] || response.data === '') {
                this.setState({ list: [{ id: 1, content: '暂无数据' }] })
            } else {
                this.setState({ list: response.data })
            }
        })
    }
    onDeleteEvent(index, id) {
        const list = this.state.list
        list.splice(index, 1)
        this.setState({
            list: list
        })
        Axios.get("/api/remove_clipboard", { params: { id: id } }).then(
            (response) => {
                Axios.get("/api/get_all_clipboard").then((response) => {
                    if (response.data === [] || response.data === '') {
                        this.setState({ list: [{ id: 1, content: '暂无数据' }] })
                    } else {
                        this.setState({ list: response.data })
                    }
                })
            }
        )
    }
    onClickEvent(v) {
    }
    onChangeEvent(e) {
        this.setState({ input: e.target.value })
    }
    add() {
        Axios.get('/api/add_clipboard', { params: { content: this.state.input } }).then(
            (response) => {
                if (response.data) {
                    this.setState({
                        open: true
                    })
                }
                Axios.get("/api/get_all_clipboard").then((response) => {
                    if (response.data === [] || response.data === '') {
                        this.setState({ list: [{ id: 1, content: '暂无数据' }] })
                    } else {
                        this.setState({ list: response.data })
                    }
                })
            }
        )
    }
    render() {
        return (
            <Container maxWidth='sm'>
                <Grid container spacing={3} justify='center' alignItems="center">
                    <Grid item xs={4}>
                        <TextField value={this.state.input} label='在这里输入' onChange={(e) => { this.onChangeEvent(e) }}></TextField>
                    </Grid>
                    <Grid item xs={3}>
                        <Button variant="contained" color='primary' onClick={() => { this.add() }}>添加</Button>
                    </Grid>
                    <Grid item xs={12}>
                        <Divider variant="middle" />
                    </Grid>
                    <Grid item xs={12}>
                        {this.state.list.map((v, index) =>
                            <CopyToClipboard text={v.content} key={v.id}>
                                <Chip label={v.content} variant="outlined" onDelete={() => { this.onDeleteEvent(index, v.id) }} onClick={() => { this.onClickEvent(v) }} />
                            </CopyToClipboard>
                        )}
                    </Grid>
                </Grid>
            </Container>
        );
    }
}
export default Index