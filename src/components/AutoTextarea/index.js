/**
 * 高度自动撑开的textarea
 * params maxLength: 默认3000
 * params placeholder: 默认'请输入'
*/
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './index.less'

class AutoTextarea extends Component {
    state = {}

    static getDerivedStateFromProps(nextProps, prevState) {
        if (JSON.stringify(nextProps) !== JSON.stringify(prevState.init)) {
            return {
                value: nextProps.value,
                init: nextProps
            }
        }
        return null;
    }

    onKeyUp = ev => {
        this.props.onChange && this.props.onChange(ev.target.value);
        this.setState({ value: ev.target.value })
    };

    render() {
        const { placeholder, maxLength } = this.props;
        return (
            <div
                className={styles.autoTextarea}
            >
                <pre>{this.state.value}</pre>
                <textarea
                    value={this.state.value}
                    placeholder={placeholder}
                    onChange={this.onKeyUp}
                    onKeyUp={this.onKeyUp}
                    maxLength={maxLength}
                ></textarea>
            </div>
        );
    }
}

export default AutoTextarea;

AutoTextarea.propTypes = {
    onChange: PropTypes.func,
    maxLength: PropTypes.number,
    placeholder: PropTypes.string
}

AutoTextarea.defaultProps = {
    onChange: () => { },
    maxLength: 3000,
    placeholder: '请输入'
}