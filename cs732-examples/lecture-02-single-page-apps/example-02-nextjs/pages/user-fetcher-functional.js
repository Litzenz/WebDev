import fetch from 'isomorphic-unfetch';

function UserFetcher(props) {
    console.log("props", props);
    const user = props.user;

    return <p>User name: {user.first_name} {user.last_name}</p>

}

UserFetcher.getInitialProps = async () => {

    const response = await fetch("https://trex-sandwich.com/ajax/users?id=2");
    const user = await response.json();
    console.log("user", user);
    return { user }
}

export default UserFetcher;