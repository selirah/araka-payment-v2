using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml;
using System.Xml.Serialization;
using System.Xml.XPath;

namespace PaymentHubProxy.Utility
{
    public class ConfigurationSectionHandler : IConfigurationSectionHandler
    {
        public object Create(object parent, object configContext, XmlNode section)
        {
            XPathNavigator navigator = section.CreateNavigator();
            string attributeName = "type";
            string typeName = (string)navigator.Evaluate("string(@" + attributeName + ")");
            if (typeName.Length == 0)
                throw new ConfigurationErrorsException(string.Format("Attribute \'{0}\' not found for section \'{1}\'", attributeName, section.Name));
            Type type = Type.GetType(typeName);
            if (type == null)
                throw new ConfigurationErrorsException(string.Format("Type \'{0}\' couldn\'t be found. Section \'{1}\'", typeName, section.Name));
            XmlSerializer ser = new XmlSerializer(type);
            XmlNodeReader nodeReader = new XmlNodeReader(section);
            return ser.Deserialize(nodeReader);
        }
    }

    public class ConfigurationSection
    {
        public static T GetSection<T>()
        {
            var sectionName = typeof(T).Name;
            if (sectionName.Substring(0, 1) == "I")
                sectionName = typeof(T).Name.Substring(1);
            ConfigurationManager.RefreshSection(sectionName);
            return (T)ConfigurationManager.GetSection(sectionName);
        }
    }
}
