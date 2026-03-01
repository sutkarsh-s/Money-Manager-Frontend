import { useState, useContext, useCallback } from "react";
import {
  User, Lock, Trash2, Camera, LoaderCircle, Shield, Calendar, Mail,
} from "lucide-react";
import moment from "moment";
import toast from "react-hot-toast";
import { Dashboard, useUser, AppContext, PageHeader, Input, Button, Modal, DeleteAlert, axiosConfig, API_ENDPOINTS, getErrorMessage, uploadProfileImage } from "@mm/shared";

const TABS = [
  { id: "profile", label: "Edit Profile", icon: User },
  { id: "password", label: "Change Password", icon: Lock },
  { id: "account", label: "Account", icon: Shield },
];

const Profile = () => {
  useUser();
  const { user, setUser, clearUser } = useContext(AppContext);
  const [activeTab, setActiveTab] = useState("profile");

  const [fullName, setFullName] = useState(user?.fullName ?? "");
  const [profileImage, setProfileImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [savingProfile, setSavingProfile] = useState(false);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [savingPassword, setSavingPassword] = useState(false);

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleImageSelect = useCallback((e) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  }, []);

  const handleRemoveImage = useCallback(() => {
    setProfileImage(null);
    setPreviewUrl(null);
  }, []);

  const handleSaveProfile = useCallback(async () => {
    if (!fullName.trim() || fullName.trim().length < 2) {
      toast.error("Full name must be at least 2 characters");
      return;
    }

    setSavingProfile(true);
    try {
      let imageUrl = user?.profileImageUrl ?? "";
      if (profileImage) {
        imageUrl = await uploadProfileImage(profileImage);
      }

      const response = await axiosConfig.put(API_ENDPOINTS.UPDATE_PROFILE, {
        fullName: fullName.trim(),
        profileImageUrl: imageUrl,
      });

      if (response.data) {
        setUser(response.data);
        setProfileImage(null);
        setPreviewUrl(null);
        toast.success("Profile updated successfully");
      }
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setSavingProfile(false);
    }
  }, [fullName, profileImage, user, setUser]);

  const handleChangePassword = useCallback(async () => {
    if (!currentPassword.trim()) {
      toast.error("Please enter your current password");
      return;
    }
    if (newPassword.length < 8) {
      toast.error("New password must be at least 8 characters");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }

    setSavingPassword(true);
    try {
      await axiosConfig.put(API_ENDPOINTS.CHANGE_PASSWORD, {
        currentPassword,
        newPassword,
      });
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      toast.success("Password changed successfully");
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setSavingPassword(false);
    }
  }, [currentPassword, newPassword, confirmPassword]);

  const handleDeleteAccount = useCallback(async () => {
    try {
      await axiosConfig.delete(API_ENDPOINTS.DELETE_ACCOUNT);
      localStorage.clear();
      clearUser();
      window.location.href = "/home";
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  }, [clearUser]);

  const avatarSrc = previewUrl || user?.profileImageUrl;

  return (
    <Dashboard activeMenu="">
      <div className="my-6 mx-auto max-w-3xl animate-fade-in">
        <PageHeader title="Profile Settings" subtitle="Manage your account preferences" />

        <div className="mt-6 flex gap-2 p-1 bg-gray-100 dark:bg-gray-800 rounded-xl overflow-x-auto">
          {TABS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              type="button"
              onClick={() => setActiveTab(id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                activeTab === id
                  ? "bg-white dark:bg-gray-700 text-purple-700 dark:text-purple-400 shadow-sm"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </div>

        <div className="mt-6">
          {activeTab === "profile" && (
            <div className="card space-y-6">
              <div className="flex flex-col items-center">
                <div className="relative group">
                  <div className="w-24 h-24 rounded-full overflow-hidden ring-4 ring-purple-100 dark:ring-purple-900/40">
                    {avatarSrc ? (
                      <img src={avatarSrc} alt="" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-purple-100 dark:bg-purple-900/40">
                        <User className="w-10 h-10 text-purple-500 dark:text-purple-400" />
                      </div>
                    )}
                  </div>
                  <label className="absolute bottom-0 right-0 w-8 h-8 flex items-center justify-center rounded-full bg-purple-600 text-white cursor-pointer hover:bg-purple-700 transition-colors shadow-lg">
                    <Camera className="w-4 h-4" />
                    <input type="file" accept="image/*" onChange={handleImageSelect} className="hidden" />
                  </label>
                </div>
                {(previewUrl || profileImage) && (
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="mt-2 text-xs text-red-500 hover:text-red-600 transition-colors"
                  >
                    Remove new photo
                  </button>
                )}
              </div>

              <div className="space-y-4">
                <Input
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  label="Full Name"
                  placeholder="John Doe"
                  type="text"
                />
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                    Email Address
                  </label>
                  <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-700/40 border border-gray-200 dark:border-gray-600 text-gray-500 dark:text-gray-400 text-sm">
                    <Mail className="w-4 h-4 flex-shrink-0" />
                    <span>{user?.email ?? ""}</span>
                  </div>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">Email cannot be changed</p>
                </div>
              </div>

              <div className="flex justify-end">
                <Button
                  variant="primary"
                  onClick={handleSaveProfile}
                  isLoading={savingProfile}
                  loadingText="Saving..."
                  className="w-auto px-8"
                >
                  Save Changes
                </Button>
              </div>
            </div>
          )}

          {activeTab === "password" && (
            <div className="card space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Change Password</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Ensure your account stays secure with a strong password
                </p>
              </div>

              <div className="space-y-4">
                <Input
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  label="Current Password"
                  placeholder="Enter current password"
                  type="password"
                  autoComplete="current-password"
                />
                <Input
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  label="New Password"
                  placeholder="Minimum 8 characters"
                  type="password"
                  autoComplete="new-password"
                />
                <Input
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  label="Confirm New Password"
                  placeholder="Re-enter new password"
                  type="password"
                  autoComplete="new-password"
                />
              </div>

              <div className="flex justify-end">
                <Button
                  variant="primary"
                  onClick={handleChangePassword}
                  isLoading={savingPassword}
                  loadingText="Updating..."
                  className="w-auto px-8"
                >
                  Update Password
                </Button>
              </div>
            </div>
          )}

          {activeTab === "account" && (
            <div className="space-y-6">
              <div className="card">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Account Information</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 p-4 rounded-xl bg-gray-50 dark:bg-gray-700/40">
                    <Calendar className="w-5 h-5 text-purple-500 flex-shrink-0" />
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Member Since</p>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {user?.createdAt ? moment(user.createdAt).format("MMMM D, YYYY") : "—"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 rounded-xl bg-gray-50 dark:bg-gray-700/40">
                    <Shield className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Account Status</p>
                      <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400">Active</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card border-red-200 dark:border-red-900/40">
                <h3 className="text-lg font-semibold text-red-600 dark:text-red-400 mb-2">Danger Zone</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Permanently delete your account and all associated data. This action cannot be undone.
                </p>
                <Button
                  variant="danger"
                  onClick={() => setShowDeleteModal(true)}
                  className="w-auto px-6"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete Account
                </Button>
              </div>
            </div>
          )}
        </div>

        <Modal
          isOpen={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          title="Delete Account"
        >
          <DeleteAlert
            content="Are you sure you want to delete your account? All your financial data, transactions, budgets, and settings will be permanently removed. This action cannot be undone."
            onDelete={handleDeleteAccount}
          />
        </Modal>
      </div>
    </Dashboard>
  );
};

export default Profile;
