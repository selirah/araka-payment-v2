using Microsoft.Extensions.Configuration;
using Npgsql;

namespace PCES.PaymentPlatform.Repository
{
    public class RepositoryBase
    {
        private readonly IConfiguration Configuration;
        public readonly NpgsqlConnection connection;
        public RepositoryBase()
        {
            connection = new NpgsqlConnection(Configuration["DBSettings:ConnectionString"]);
        }

        //public T RunQuery<T>(System.Data.CommandType commandType, string query,object parameters)
        //{
        //    using (connection)
        //    {
        //        switch (commandType)
        //        {
        //            case System.Data.CommandType.Text:
        //                break;
        //            case System.Data.CommandType.StoredProcedure:
        //                break;
        //            case System.Data.CommandType.TableDirect:
        //                break;
        //            default:
        //                break;
        //        }
        //    }
        //}
    }
}
