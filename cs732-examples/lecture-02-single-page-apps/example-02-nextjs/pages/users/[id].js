// import { useRouter } from 'next/router';

// export default function User() {

//     const router = useRouter();
//     const { id } = router.query;

//     return (
//         <div>
//             <p>User id: {id}</p>
//         </div>
//     );
// }

import { withRouter } from 'next/router';

class User extends React.Component {

    render() {
        const { id } = this.props.router.query;

        return (
            <div>
                <p>User id: {id}</p>
            </div>
        );
    }
}

export default withRouter(User);