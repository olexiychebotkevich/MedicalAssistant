using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebPush = Lib.Net.Http.WebPush;

namespace MedicalAssistant.DAL.Entities
{
    public  class EFDbContext : IdentityDbContext<DbUser, DbRole, int, IdentityUserClaim<int>,
                     DbUserRole, IdentityUserLogin<int>,
                     IdentityRoleClaim<int>, IdentityUserToken<int>>
    {
        public class PushSubscription : WebPush.PushSubscription
        {
            public string P256DH
            {
                get { return GetKey(WebPush.PushEncryptionKeyName.P256DH); }

                set { SetKey(WebPush.PushEncryptionKeyName.P256DH, value); }
            }

            public string Auth
            {
                get { return GetKey(WebPush.PushEncryptionKeyName.Auth); }

                set { SetKey(WebPush.PushEncryptionKeyName.Auth, value); }
            }

            public PushSubscription()
            { }

            public PushSubscription(WebPush.PushSubscription subscription)
            {
                Endpoint = subscription.Endpoint;
                Keys = subscription.Keys;
            }
        }

        public EFDbContext(DbContextOptions<EFDbContext> options)
            : base(options)
        {

        }
        public DbSet<PushSubscription> Subscriptions { get; set; }
        public DbSet<DetailedPatient> DetailedUsers { get; set; }
        public DbSet<DetailedDoctor> DetailedDoctors { get; set; }
        public DbSet<RefreshToken> RefreshTokens { get; set; }
        public DbSet<Recipe> Recipes { get; set; }

        

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<DbUserRole>(userRole =>
            {
                userRole.HasKey(ur => new { ur.UserId, ur.RoleId });

                userRole.HasOne(ur => ur.Role)
                    .WithMany(r => r.UserRoles)
                    .HasForeignKey(ur => ur.RoleId)
                    .IsRequired();

                userRole.HasOne(ur => ur.User)
                    .WithMany(r => r.UserRoles)
                    .HasForeignKey(ur => ur.UserId)
                    .IsRequired();
            });
            EntityTypeBuilder<PushSubscription> pushSubscriptionEntityTypeBuilder = builder.Entity<PushSubscription>();
            pushSubscriptionEntityTypeBuilder.HasKey(e => e.Endpoint);
            pushSubscriptionEntityTypeBuilder.Ignore(p => p.Keys);
        }
    }
}
