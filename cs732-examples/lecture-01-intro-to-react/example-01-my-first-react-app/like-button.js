class LikeButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = { liked: false };
    }
    render() {
        if (this.state.liked) {
            return 'You liked this.';
        }
        return React.createElement(
            'button',
            { onClick: () => this.setState({ liked: true }) },
            'Like'
        );
    }
}

// Render a LikeButton in the #container <div> using React
const container = document.querySelector("#container");
ReactDOM.render(React.createElement(LikeButton), container);
