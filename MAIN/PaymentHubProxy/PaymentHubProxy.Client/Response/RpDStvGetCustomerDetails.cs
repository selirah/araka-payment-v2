using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PaymentHubProxy.Client.Response
{
   public class RpDStvGetCustomerDetails
    {
        public string CustomerNumber { get; set; }
    }   

    public class CustomerDetailsDTO
    {
        public string CustomerNumber { get; set; }
        
        public DateTime DateOfBirth { get; set; }
        
        public string Firstname { get; set; }
        
        public string Surname { get; set; }
        
        public string CellNumber { get; set; }
        
        public string WorkPhone { get; set; }
        
        public string FaxNumber { get; set; }
        
        public string HomePhone { get; set; }
        
        public string Initials { get; set; }
        
        public string Language { get; set; }
        
        public string Status { get; set; }
        
        public string Type { get; set; }
        
        public string TypeName { get; set; }
    }
}
