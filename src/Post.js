import React from "react";
import PropTypes from "prop-types";

export class Post extends React.PureComponent {
    render() {
        const {author, comment} = this.props.post;
        return (<div className={'post'}>
            <div className={'post-author'}>{author}</div>
            <div className={'post-comment'}>{comment}</div>
        </div>)
    }
}

Post.propTypes = {
    post: PropTypes.object
};