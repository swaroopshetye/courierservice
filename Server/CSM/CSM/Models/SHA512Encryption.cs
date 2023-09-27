using System;
using System.Security.Cryptography;
using System.Text;

namespace CSM.Models
{
    public class SHA512Encryption
    {
        public string Encode(string str)
        {
            StringBuilder sb = new StringBuilder();
            using (SHA512 sha512 = SHA512.Create())
            {
                byte[] hashValue = sha512.ComputeHash(Encoding.UTF8.GetBytes(str));
                foreach (byte b in hashValue)
                {
                    sb.Append($"{b:X2}");
                }
            }
            return sb.ToString();
        }

    }
}