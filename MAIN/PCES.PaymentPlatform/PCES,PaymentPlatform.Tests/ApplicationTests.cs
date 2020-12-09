using NUnit.Framework;
using PCES.PaymentPlatform.Repository.Application;

namespace PCES_PaymentPlatform.Tests
{
    public class ApplicationTests
    {
        [SetUp]
        public void Setup()
        {
        }

        [Test]
        public void Test1()
        {
            Assert.Pass();
        }

        [Test]
        public void SelectApplicationEmptyResult()
        {
            ApplicationRepository applicationRepository = new ApplicationRepository();
            Assert.IsNull(applicationRepository.GetApplicationById(-1));
        }
    }
}