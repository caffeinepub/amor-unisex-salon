import Text "mo:core/Text";
import Iter "mo:core/Iter";
import Map "mo:core/Map";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import Order "mo:core/Order";

actor {
  type Appointment = {
    id : Nat;
    name : Text;
    phone : Text;
    email : Text;
    service : Text;
    date : Text;
    time : Text;
    notes : Text;
    submittedBy : Principal;
  };

  module Appointment {
    public func compare(appointment1 : Appointment, appointment2 : Appointment) : Order.Order {
      Nat.compare(appointment1.id, appointment2.id);
    };
  };

  var nextId = 0;

  let appointments = Map.empty<Nat, Appointment>();

  public shared ({ caller }) func bookAppointment(
    name : Text,
    phone : Text,
    email : Text,
    service : Text,
    date : Text,
    time : Text,
    notes : Text,
  ) : async Nat {
    if (name.size() == 0 or date.size() == 0 or time.size() == 0) {
      Runtime.trap("Name, date, and time are required.");
    };
    let appointment : Appointment = {
      id = nextId;
      name;
      phone;
      email;
      service;
      date;
      time;
      notes;
      submittedBy = caller;
    };
    appointments.add(nextId, appointment);
    nextId += 1;
    appointment.id;
  };

  public query ({ caller }) func getAllAppointments() : async [Appointment] {
    appointments.values().toArray().sort();
  };

  public shared ({ caller }) func cancelAppointment(appointmentId : Nat) : async () {
    if (not appointments.containsKey(appointmentId)) {
      Runtime.trap("Appointment not found");
    };
    appointments.remove(appointmentId);
  };
};
