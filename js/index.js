"use strict";

var LeaderBoard = React.createClass({
    displayName: "LeaderBoard",

    getInitialState: function getInitialState() {
        return {
            url: ""
        };
    },

    componentDidMount: function componentDidMount() {

        this.serverRequestAllTime = $.get(this.props.allTime, function (result) {

            var z = result;
            this.setState({

                alltime: z,
                show: z

            });
        }.bind(this));

        this.serverRequestRecent = $.get(this.props.recent, function (result) {

            var z = result;
            this.setState({

                recent: z

            });
        }.bind(this));
    },
    componentWillUnmount: function componentWillUnmount() {
        this.serverRequest.abort();
    },
    all: function all() {
        this.setState({
            show: this.state.alltime
        });
    },
    rec: function rec() {
        this.setState({
            show: this.state.recent
        });
    },

    render: function render() {
        console.log(this.state.data);
        var list = this.state.show;
        var b = [];
        for (var key in list) {
            b.push(list[key]);
        }
        console.log(b);
        var recentList = b.map(function (x, index) {
            return React.createElement(
                "tr",
                null,
                React.createElement(
                    "td",
                    null,
                    index
                ),
                React.createElement(
                    "td",
                    null,
                    React.createElement("img", { src: x.img }),
                    "         ",
                    x.username,
                    "         "
                ),
                React.createElement(
                    "td",
                    null,
                    x.alltime
                ),
                React.createElement(
                    "td",
                    null,
                    x.recent
                )
            );
        });

        return React.createElement(
            "div",
            null,
            React.createElement(
                "h1",
                null,
                "Freecodecamp Leaderboard"
            ),
            React.createElement(
                "table",
                { onClick: this.morph },
                React.createElement(
                    "thead",
                    null,
                    React.createElement(
                        "th",
                        null,
                        "\"#\""
                    ),
                    React.createElement(
                        "th",
                        null,
                        "Camper Name"
                    ),
                    React.createElement(
                        "th",
                        { onClick: this.all },
                        React.createElement(
                            "a",
                            null,
                            "All time points"
                        )
                    ),
                    React.createElement(
                        "th",
                        { onClick: this.rec },
                        React.createElement(
                            "a",
                            null,
                            "Points in 30 days"
                        )
                    )
                ),
                recentList
            )
        );
    }

});

ReactDOM.render(React.createElement(LeaderBoard, { allTime: "https://fcctop100.herokuapp.com/api/fccusers/top/alltime", recent: "https://fcctop100.herokuapp.com/api/fccusers/top/recent" }), document.getElementById('content'));