﻿//------------------------------------------------------------------------------
// <auto-generated>
//    This code was generated from a template.
//
//    Manual changes to this file may cause unexpected behavior in your application.
//    Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace CSM.Models
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Infrastructure;
    
    public partial class CSMEntities1 : DbContext
    {
        public CSMEntities1()
            : base("name=CSMEntities1")
        {
        }
    
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            throw new UnintentionalCodeFirstException();
        }
    
        public DbSet<Complaint> Complaints { get; set; }
        public DbSet<Delivery_Personnel> Delivery_Personnel { get; set; }
        public DbSet<Dispatcher> Dispatchers { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<Package_Price> Package_Price { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<Tracking> Trackings { get; set; }
        public DbSet<User_Info> User_Info { get; set; }
    }
}
