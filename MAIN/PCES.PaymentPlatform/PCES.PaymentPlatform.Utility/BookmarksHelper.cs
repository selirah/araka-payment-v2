using DevExpress.XtraRichEdit.API.Native;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Runtime.InteropServices.ComTypes;

namespace PCES.PaymentPlatform.Utility
{
    public static class BookmarksHelper
    {
        public static List<Bookmark> GetDocumentBookmarks(Document document)
        {
            List<Bookmark> documentBookmarks = new List<Bookmark>();
            GetSubDocumentBookmarks(document, documentBookmarks);

            foreach (Section section in document.Sections)
            {
                if (section.HasHeader(HeaderFooterType.First))
                {
                    GetBookmarksFromHeader(HeaderFooterType.First, section, documentBookmarks);
                }
                if (section.HasHeader(HeaderFooterType.Primary))
                {
                    GetBookmarksFromHeader(HeaderFooterType.Primary, section, documentBookmarks);
                }
                else
                {
                    if (section.HasHeader(HeaderFooterType.Even))
                    {
                        GetBookmarksFromHeader(HeaderFooterType.Even, section, documentBookmarks);
                    }
                    if (section.HasHeader(HeaderFooterType.Odd))
                    {
                        GetBookmarksFromHeader(HeaderFooterType.Odd, section, documentBookmarks);
                    }
                }

                if (section.HasFooter(HeaderFooterType.First))
                {
                    GetBookmarksFromFooter(HeaderFooterType.First, section, documentBookmarks);
                }
                if (section.HasFooter(HeaderFooterType.Primary))
                {
                    GetBookmarksFromFooter(HeaderFooterType.Primary, section, documentBookmarks);
                }
                else
                {
                    if (section.HasFooter(HeaderFooterType.Even))
                    {
                        GetBookmarksFromFooter(HeaderFooterType.Even, section, documentBookmarks);
                    }
                    if (section.HasFooter(HeaderFooterType.Odd))
                    {
                        GetBookmarksFromFooter(HeaderFooterType.Odd, section, documentBookmarks);
                    }
                }
            }

            return documentBookmarks;
        }
        private static void GetBookmarksFromHeader(HeaderFooterType type, Section section, List<Bookmark> list)
        {
            SubDocument header = section.BeginUpdateHeader(type);
            GetSubDocumentBookmarks(header, list);
            section.EndUpdateHeader(header);
        }
        private static void GetBookmarksFromFooter(HeaderFooterType type, Section section, List<Bookmark> list)
        {
            SubDocument footer = section.BeginUpdateFooter(type);
            GetSubDocumentBookmarks(footer, list);
            section.EndUpdateFooter(footer);
        }
        private static void GetBookmarksFromTextBoxes(SubDocument subDocument, List<Bookmark> list)
        {
            foreach (Shape shape in subDocument.Shapes)
            {
                if (shape.TextBox != null)
                {
                    GetSubDocumentBookmarks(shape.TextBox.Document, list);
                }
            }
        }
        private static void GetSubDocumentBookmarks(SubDocument subdocument, List<Bookmark> list)
        {
            list.AddRange(subdocument.Bookmarks);
            GetBookmarksFromTextBoxes(subdocument, list);
        }
        private static List<string> UniqueKeys(JArray parsedArray)
        {
            List<string> uniqueHeaders = new List<string>();
            foreach (JObject parsedObject in parsedArray.Children<JObject>())
            {
                foreach (JProperty parsedProperty in parsedObject.Properties())
                {
                    string propertyName = parsedProperty.Name;
                    if (!uniqueHeaders.Contains(propertyName))
                        uniqueHeaders.Add(propertyName);
                }
            }
            return uniqueHeaders;
        }
        public static void InsertTableDataAtBookmark(Document document, JArray data, DocumentRange range)
        {
            // Get unique headers
            List<string> headers = UniqueKeys(data);

            // Get number of columns
            int columnCount = headers.Count;

            // Insert new table.
            Table tbl = document.Tables.Create(range.Start, 1, columnCount, AutoFitBehaviorType.AutoFitToWindow);


            // Insert table data.
            try
            {
                tbl.BeginUpdate();
                // Create a table header.
                for (int i = 0; i < columnCount; i++)
                {
                    document.InsertText(tbl[0, i].Range.Start, headers[i]);
                }

                foreach (JToken jdata in data)
                {
                    TableRow row = tbl.Rows.Append();
                    TableCell cell = row.FirstCell;
                    for (int i = 0; i < columnCount; i++)
                    {
                        string cellValue = "";
                        if (jdata[headers[i]] != null)
                            cellValue = jdata[headers[i]].Value<string>();
                        document.InsertSingleLineText(cell.Range.Start, cellValue);
                        cell = cell.Next;
                    }
                }
                // Center the table header.
                foreach (Paragraph p in document.Paragraphs.Get(tbl.FirstRow.Range))
                {
                    p.Alignment = ParagraphAlignment.Center;
                }
            }
            finally
            {
                tbl.EndUpdate();
            }
        }
    }
}
