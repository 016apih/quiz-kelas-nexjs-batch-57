import SectionNotification from "@/components/notification/sectionNotification";
import useQueries from "@/hooks/useQueries";

const Notifications = () => {
   
   const { data, isLoading, fetchingData, useMutate, isLoadingSubmit, } = useQueries({
      prefixUrl: '/notifications',
      withToastSuccess: true
   });

   return (
      <SectionNotification
         data={data}
         loading={isLoading}
      />
   )
}

export default Notifications