using JWT;
using JWT.Algorithms;
using JWT.Exceptions;
using JWT.Serializers;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Security.Cryptography.X509Certificates;

namespace CSM.Models
{
    public class JWTTokenizer
    {
       
        private string secretKey = "Sunbeam";
        public string GenerateToken(string data, TimeSpan expirationTime)
        {
            var payload = new Dictionary<string, object>
            {
                { "claim1", 0 },
                { "claim2", data },
                { "time", DateTimeOffset.UtcNow.ToUnixTimeSeconds()},
                { "exp", (long)DateTime.UtcNow.Add(expirationTime).Subtract(new DateTime(1970, 1, 1)).TotalSeconds}
            };

            IJwtAlgorithm algorithm = new HMACSHA256Algorithm();
            IJsonSerializer serializer = new JsonNetSerializer();
            IBase64UrlEncoder urlEncoder = new JwtBase64UrlEncoder();
            IJwtEncoder encoder = new JwtEncoder(algorithm, serializer, urlEncoder);
            var token = encoder.Encode(payload, secretKey);
            return token;
        }

        public string validateToken(string token)
        {
            try
            {
                IJwtAlgorithm algorithm = new HMACSHA256Algorithm();
                IJsonSerializer serializer = new JsonNetSerializer();
                IDateTimeProvider provider = new UtcDateTimeProvider();
                IJwtValidator validator = new JwtValidator(serializer, provider);
                IBase64UrlEncoder urlEncoder = new JwtBase64UrlEncoder();
                IJwtDecoder decoder = new JwtDecoder(serializer, validator, urlEncoder, algorithm);
                var json = decoder.Decode(token, secretKey, verify: true);
                if (json != null)
                {
                    return "VALID";
                }
                else
                {
                    return "INVALID";
                }
            }
            catch (TokenNotYetValidException)
            {
                Console.WriteLine("Token is not valid yet");
                return "INVALID";
            }
            catch (TokenExpiredException)
            {
                Console.WriteLine("Token has expired");
                return "EXPIRED";
            }
            catch (SignatureVerificationException)
            {
                Console.WriteLine("Token has invalid signature");
                return "INVALID";
            }
        }
    }
}