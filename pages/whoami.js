import axios from 'axios';
import { connect } from 'react-redux';
import { API } from '../config';
import initialize from '../utils/initialize';
import Layout from '../components/Layout';

const Whoami = ({ user }) => (
  <Layout title="Who Am I">
    {(user && (
      <h3 className="title is-3">
        You are logged in as{' '}
        <strong className="is-size-2 has-text-primary">{user.email}</strong>.
      </h3>
    )) || (
      <h3 className="title is-3 has-text-danger	">You are not authenticated.</h3>
    )}
  </Layout>
);

Whoami.getInitialProps = async ctx => {
  initialize(ctx);
  const token = ctx.store.getState().authentication.token;
  if (token.token) {
    const response = await axios.get(`${API}/user`, {
      headers: {
        'Authorization': 'Bearer ' + token.token
      }
    });
    const user = response.data;
    console.log(user);
    return {
      user
    };
  }
};

export default connect(state => state)(Whoami);
