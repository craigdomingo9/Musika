import BusinessAdminHeader from '@/components/Business/Admin/BusinessAdminHeader'
import Dashboard from '@/components/Business/Admin/Dashboard/Home/Dashboard'


type Props = {
  searchParams: {
    page: string,
  }
}

function BusinessAdmin({searchParams: {page}}: Props) {
  return (
    <div className=''>

      <BusinessAdminHeader />
      <Dashboard page={page} />

    </div>
  )
}

export default BusinessAdmin