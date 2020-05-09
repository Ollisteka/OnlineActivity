import React from "react";
import PropTypes from "prop-types";
import * as GuessState from './GuessState';
import classNames from 'classnames';

export class Post extends React.PureComponent {
    state = {
        guess: GuessState.NONE
    };

    render() {
        const {author, comment} = this.props.post;
        const reactionButtons = this.props.activeReactions;
        const guess = this.state.guess;
        return (<div className={classNames('post', {
            'post__warm': guess === GuessState.WARM,
            'post__cold': guess === GuessState.COLD,
            'post__correct': guess === GuessState.CORRECT
        })}>
            {reactionButtons && (
                <>
                    <button className={'cold-button'} onClick={this.onColdButtonClick}/>
                    <button className={'warm-button'} onClick={this.onWarmButtonClick}/>
                </>
            )}
            <div className={'content'}>
                <div className={'post-author'}>{author}</div>
                <div className={'post-comment'}>{comment}</div>
            </div>
            {reactionButtons && <button className={'correct-button'} onClick={this.onCorrectButtonClick}/>}
        </div>)
    }

    onColdButtonClick = () => this.setState({guess: GuessState.COLD});
    onWarmButtonClick = () => this.setState({guess: GuessState.WARM});
    onCorrectButtonClick = () => this.setState({guess: GuessState.CORRECT});
}

Post.propTypes = {
    post: PropTypes.object,
    activeReactions: PropTypes.bool
};