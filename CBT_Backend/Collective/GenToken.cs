using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using CBT_Backend.DTO;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;

namespace CBT_Backend.Collective
{
    public class GenToken
    {
        private readonly IConfiguration _config;
        public GenToken(IConfiguration? config)
        {
            _config = config!;
        }
        public string generate_Token(Authenticate_DTO authenticate)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config!.GetSection("Jwt:Key").Value));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var Claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, authenticate!.Id!.ToString()!),
                new Claim(ClaimTypes.Name, authenticate!.FirstName!),
                new Claim(ClaimTypes.GivenName, authenticate!.LastName!),
                new Claim(ClaimTypes.Role, authenticate!.Role!),
                new Claim(ClaimTypes.Email, authenticate!.Email!),
            };
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(Claims),
                Expires = DateTime.Now.AddYears(1),
                SigningCredentials = credentials,
                Issuer = _config.GetSection("Jwt:Issuer").Value,
                Audience = _config.GetSection("Jwt:Audience").Value
            };

            var tokenHandler = new JwtSecurityTokenHandler();

            var token = tokenHandler.CreateToken(tokenDescriptor);

            var mainToken = new
            {
                token = new JwtSecurityTokenHandler().WriteToken(token),
                expiration = token.ValidTo
            };

            return JsonConvert.SerializeObject(mainToken);
        }
    }
}