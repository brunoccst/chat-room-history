using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Runtime.Serialization;

namespace DataAccess.Enums
{
    [DataContract]
    public enum EventType
    {
        [EnumMember(Value = "enter-the-room")]
        EnterTheRoom,
        [EnumMember(Value = "comment")]
        Comment,
        [EnumMember(Value = "high-five-another-user")]
        HighFiveAnotherUser,
        [EnumMember(Value = "leave-the-room")]
        LeaveTheRoom
    }
}
