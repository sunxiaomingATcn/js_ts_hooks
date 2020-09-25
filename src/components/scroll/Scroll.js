import React from "react"
import PropTypes from "prop-types"
import BScroll from "better-scroll"

class Scroll extends React.Component {
  constructor(props) {
    super(props);
    this.scrollViewRef = React.createRef();
  }
  componentDidUpdate() {
    // 组件更新后，如果实例化了better-scroll并且需要刷新就调用refresh()函数
    if (this.bScroll && this.props.refresh === true) {
      this.bScroll.refresh();
    }
  }
  componentDidMount() {
    if (!this.bScroll) {
      this.bScroll = new BScroll(this.scrollViewRef.current, {
        preventDefault: true,
        scrollX: this.props.direction === "horizontal",
        scrollY: this.props.direction === "vertical",
        // 实时派发scroll事件
        probeType: 3,
        // click: this.props.click,
        pullDownRefresh: this.props.pullDownRefresh,
        pullUpLoad: this.props.pullUpLoad,
        mouseWheel: true,
        scrollbars: true,
        click:true
      });

      if (this.props.pullDownRefresh) {
        this.pullDownRefresh();
      }

      if (this.props.pullUpLoad) {
        this.pullUpLoad();
      }
    }
  }
  pullDownRefresh() {
    this.bScroll.on("pullingDown", async (scroll) => {
      const resolve = await this.props.onPullingDown('pullingDown');
      resolve && this.bScroll.finishPullDown();
    });
  }

  pullUpLoad() {
    this.bScroll.on("touchEnd", async (e) => {
      if (this.bScroll.y <= this.bScroll.maxScrollY - 50) {
        const resolve = await this.props.onPullingUp('pullingUp');
        resolve && this.bScroll.finishPullUp();
      }
    })
  }


  componentWillUnmount() {
    this.bScroll.off("scroll");
    this.bScroll = null;
  }

  refresh() {
    if (this.bScroll) {
      this.bScroll.refresh();
    }
  }

  render() {
    let horizontalStyle = this.props.direction === "horizontal" ? { whiteSpace: 'nowrap', width:'fit-content' } :{};
    return (
      <div ref={this.scrollViewRef}  className='scroll-touch' style={{ overflow: 'hidden', height: '100%'}}>
        <div className='wrapper'  style={ horizontalStyle } >
          {this.props.children}
        </div>
      </div>
    );
  }
}

Scroll.defaultProps = {
  direction: "vertical",
  click: true,
  refresh: true,
  onScroll: null,
  onPullingUp: null,
  onPullingDown: null,
  pullDownRefresh: false,
  pullUpLoad: false
};

Scroll.propTypes = {
  direction: PropTypes.oneOf(['vertical', 'horizontal']),
  // 是否启用点击
  click: PropTypes.bool,
  // 是否刷新
  refresh: PropTypes.bool,
  onScroll: PropTypes.func,
  onPullingUp: PropTypes.func,
  onPullingDown: PropTypes.func,
};

export default Scroll
