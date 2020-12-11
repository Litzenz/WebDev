import styles from '../css/staff-details.module.css';

export default function StaffDetails(props) {

    const staffMember = props.staffMember;

    return (
        <div className={styles.tableContainer}>
            <table className={styles.table}>
                <tbody>
                    {staffMember.name && <tr><th>Name:</th><td>{staffMember.name}</td></tr>}
                    {staffMember.department && <tr><th>Department:</th><td>{staffMember.department}</td></tr>}
                    {staffMember.phNumber && <tr><th>Ph #:</th><td>{staffMember.phNumber}</td></tr>}
                    {staffMember.email && <tr><th>Email:</th><td>{staffMember.email}</td></tr>}
                </tbody>
            </table>
        </div>
    );
}