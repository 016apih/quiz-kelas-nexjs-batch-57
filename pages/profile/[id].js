import { useRouter } from 'next/router';
import ProfileContainer from '@/containers/container-profile';

const Profile = () => {
   const router = useRouter();
   const { id } = router?.query;
   return (
      <ProfileContainer id={id} />
   )
}

export default Profile;