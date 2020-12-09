using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PCES.PaymentPlatform.WebAPI.DAL
{
    public enum OrderTypes
    {
        Purchase,
        PreAuth
    }

    public enum OperationTypes
    {
        CreateOrder,
        GetOrderStatus,
        Completion
    }

    public enum OrderStatuses
    {
        Approved = 1,
        Declined = 2,
    }
}
