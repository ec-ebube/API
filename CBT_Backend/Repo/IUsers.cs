using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CBT_Backend.DTO;
using CBT_Backend.Models;

namespace CBT_Backend.Repo
{
    public interface IUsers
    {
        public Task<IEnumerable<Users>> GetUsers();
        public Task<Users> GetUser(string id);
        public Task<string> UpdateUser(string id, Users_DTO users);
        public Task<string> DeleteUser(string id);
        public Task<string> CreateUser(Users_DTO users);
    }

    
}