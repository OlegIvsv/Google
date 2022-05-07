using System;
using System.Collections;
using System.Linq;

namespace GooglePVI.Helpers
{
    public class RequestParseHelper
    {
        public IEnumerable<string> Parse(string request, string devider)
        {
            return request
                .Split(devider, StringSplitOptions.RemoveEmptyEntries)
                .Select(word => word.Trim())
                .ToArray();
        }
    }
}
