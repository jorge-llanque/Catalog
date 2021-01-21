import passport from 'passport';

import '../auth/strategies/jwt';

const auth: any = passport.authenticate("jwt", {session: false})
export default auth