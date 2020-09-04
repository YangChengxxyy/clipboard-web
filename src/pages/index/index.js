import React from 'react';
import { Container, Chip, Grid, Button, Divider, TextField, Snackbar } from '@material-ui/core';
import Axios from 'axios';
import { CopyToClipboard } from 'react-copy-to-clipboard';
class Index extends React.Component {
    constructor() {
        super()
        this.state = {
            list: [{ id: 1, content: '暂无数据', }],
            input: '',
            open: false,
            message: ''
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
        this.showMessage('删除成功')
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
        this.showMessage('添加成功')
    }
    showMessage(message) {
        this.setState({ open: true, message: message })
    }
    closeSnackbar() {
        this.setState({ open: false })
    }
    render() {
        return (
            <Container maxWidth='sm'>
                <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                    open={this.state.open}
                    message={this.state.message}
                    onClose={() => this.closeSnackbar()}
                    key={'topcenter'}
                    autoHideDuration={1000}
                ></Snackbar>
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