using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PCES.PaymentPlatform.WebAPI.DTO
{
    public class RqForm
    {
        public string  ProcessKey { get; set; }
        public string FormData { get; set; }
    }

    public class DesResponse<T1, T2>
    {
        public T1 Data { get; set; }
        public T2 MetaData { get; set; }
    }
     
    public class Airtime
    {
        public string phone { get; set; }
    }

    public class SchoolFees
    {
        public string StudentId { get; set; }
        public string Name { get; set; }
    }

    public class MetaDto
    {
        public string Timezone { get; set; }
        public string Time { get; set; }
    }

}
