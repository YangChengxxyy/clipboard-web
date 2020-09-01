import React from 'react';
import { Container, Button } from '@material-ui/core';
class Index extends React.Component {
    onClickEvent(t) {
        alert(t)
    }
    render() {
        return (
            <Container maxWidth='sm'>
                <Button variant="contained" onClick={() => this.onClickEvent(this.props.title)} color='primary'>{this.props.title}</Button>
            </Container>
        );
    }
}
export default Index