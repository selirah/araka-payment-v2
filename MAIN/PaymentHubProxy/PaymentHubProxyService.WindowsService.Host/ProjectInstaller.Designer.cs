namespace PaymentHubProxyService.WindowsService.Host
{
    partial class ProjectInstaller
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary> 
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Component Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            this.paymentHubProxyServiceProcessInstaller = new System.ServiceProcess.ServiceProcessInstaller();
            this.paymentHubProxyServiceInstaller = new System.ServiceProcess.ServiceInstaller();
            // 
            // paymentHubProxyServiceProcessInstaller
            // 
            this.paymentHubProxyServiceProcessInstaller.Account = System.ServiceProcess.ServiceAccount.LocalSystem;
            this.paymentHubProxyServiceProcessInstaller.Password = null;
            this.paymentHubProxyServiceProcessInstaller.Username = null;
            // 
            // paymentHubProxyServiceInstaller
            // 
            this.paymentHubProxyServiceInstaller.DisplayName = "PaymentHub Proxy Service";
            this.paymentHubProxyServiceInstaller.ServiceName = "PaymentHubProxyService";
            // 
            // ProjectInstaller
            // 
            this.Installers.AddRange(new System.Configuration.Install.Installer[] {
            this.paymentHubProxyServiceProcessInstaller,
            this.paymentHubProxyServiceInstaller});

        }

        #endregion

        private System.ServiceProcess.ServiceProcessInstaller paymentHubProxyServiceProcessInstaller;
        private System.ServiceProcess.ServiceInstaller paymentHubProxyServiceInstaller;
    }
}