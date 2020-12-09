using log4net;
using PaymentHubProxy.Service;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Diagnostics;
using System.Linq;
using System.ServiceModel;
using System.ServiceProcess;
using System.Text;
using System.Threading.Tasks;

namespace PaymentHubProxyService.WindowsService.Host
{
    public partial class PaymentHubProxyService : ServiceBase
    {
        ServiceHost _handlerHost = new ServiceHost(typeof(PaymentHubProxyManager));
        private static ILog _log = null;
        public PaymentHubProxyService()
        {
            InitializeComponent();
            log4net.Config.XmlConfigurator.Configure();
            _log = LogManager.GetLogger("PaymentHubProxyLog");

            _handlerHost.Faulted += new EventHandler(HostFaultedEventHandler);
            _handlerHost.Opened += new EventHandler(HostOpenedEventHandler);
            _handlerHost.Opening += new EventHandler(HostOpeningEventHandler);
            _handlerHost.Closing += new EventHandler(HostClosingEventHandler);
            _handlerHost.Closed += new EventHandler(HostClosedEventHandler);
            _handlerHost.UnknownMessageReceived += new EventHandler<UnknownMessageReceivedEventArgs>(UnknownMessageReceivedEventHandler);
        }

        protected override void OnStart(string[] args)
        {
            _handlerHost.Open();
            _log.Info(" service started successfully");
        }

        protected override void OnStop()
        {
            _handlerHost.Close();
            _log.Info(" service stoped successfully");
        }


        #region Private event hadlers

        private static void HostFaultedEventHandler(object sender, EventArgs e)
        {
            if (_log != null)
                _log.Error(" host is Faulted");
        }

        private static void HostOpeningEventHandler(object sender, EventArgs e)
        {
            if (_log != null)
                _log.Info(" host is Opening");
        }

        private static void HostOpenedEventHandler(object sender, EventArgs e)
        {
            if (_log != null)
                _log.Info(" host is Opened");
        }

        private static void HostClosingEventHandler(object sender, EventArgs e)
        {
            if (_log != null)
                _log.Info(" host is Closing");
        }

        private static void HostClosedEventHandler(object sender, EventArgs e)
        {
            if (_log != null)
                _log.Info(" host is Closed");
        }

        private static void UnknownMessageReceivedEventHandler(object sender, UnknownMessageReceivedEventArgs arg)
        {
            if (_log != null)
                _log.Info(" host has received unknown message : " + arg != null ? arg.Message.ToString() : "null");
        }

        #endregion
    }
}
