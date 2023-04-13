using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CBT_Backend.DTO;
using CBT_Backend.Models;

namespace CBT_Backend.Repo
{
    public interface IOptions
    {
        public Task<IEnumerable<Options>> GetOptions();
        public Task<Options> GetOption(string id);
        public Task<string> UpdateOption(string id, Options_DTO options);
        public Task<string> DeleteOption(string id);
        public Task<string> CreateOption(Options_DTO options);
    }
}