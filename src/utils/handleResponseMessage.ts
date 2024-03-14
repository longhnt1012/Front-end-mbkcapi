import { getLanguage } from './utils';
import { Language } from 'common/enums';
import { EngMessageConstant } from 'constants/EngMessageConstant';
import { VieMessageConstant } from 'constants/VieMessageConstant';
import { EngErrorMessageConstant } from 'constants/EngErrorMessageConstant';
import { VieErrorMessageConstant } from 'constants/VieErrorMessageConstant';

export const handleResponseMessage = (response: string) => {
  const currentLanguage = getLanguage();

  const responseMessage =
    currentLanguage === Language.ENGLISH
      ? response === EngMessageConstant.LoginSuccessfully
        ? EngMessageConstant.LoginSuccessfully
        : response === EngMessageConstant.ResetPasswordSuccessfully
        ? EngMessageConstant.ResetPasswordSuccessfully
        : response === EngMessageConstant.UpdateAccountSuccessfully
        ? EngMessageConstant.UpdateAccountSuccessfully
        : response === EngMessageConstant.SentEmailConfirmationSuccessfully
        ? EngMessageConstant.SentEmailConfirmationSuccessfully
        : response === EngMessageConstant.ConfirmedOTPCodeSuccessfully
        ? EngMessageConstant.ConfirmedOTPCodeSuccessfully
        : response === EngMessageConstant.CreatedNewKitchenCenterSuccessfully
        ? EngMessageConstant.CreatedNewKitchenCenterSuccessfully
        : response === EngMessageConstant.UpdatedKitchenCenterSuccessfully
        ? EngMessageConstant.UpdatedKitchenCenterSuccessfully
        : response === EngMessageConstant.UpdatedKitchenCenterStatusSuccessfully
        ? EngMessageConstant.UpdatedKitchenCenterStatusSuccessfully
        : response === EngMessageConstant.DeletedKitchenCenterSuccessfully
        ? EngMessageConstant.DeletedKitchenCenterSuccessfully
        : response === EngMessageConstant.CreatedNewBrandSuccessfully
        ? EngMessageConstant.CreatedNewBrandSuccessfully
        : response === EngMessageConstant.UpdatedBrandSuccessfully
        ? EngMessageConstant.UpdatedBrandSuccessfully
        : response === EngMessageConstant.UpdatedBrandStatusSuccessfully
        ? EngMessageConstant.UpdatedBrandStatusSuccessfully
        : response === EngMessageConstant.UpdatedBrandProfileSuccessfully
        ? EngMessageConstant.UpdatedBrandProfileSuccessfully
        : response === EngMessageConstant.DeletedBrandSuccessfully
        ? EngMessageConstant.DeletedBrandSuccessfully
        : response === EngMessageConstant.UpdatedStoreStatusSuccessfully
        ? EngMessageConstant.UpdatedStoreStatusSuccessfully
        : response === EngMessageConstant.UpdatedStoreInformationSuccessfully
        ? EngMessageConstant.UpdatedStoreInformationSuccessfully
        : response === EngMessageConstant.DeletedStoreSuccessfully
        ? EngMessageConstant.DeletedStoreSuccessfully
        : response === EngMessageConstant.RegisteredNewStoreSuccessfully
        ? EngMessageConstant.RegisteredNewStoreSuccessfully
        : response === EngMessageConstant.ConfirmedStoreRegistrationSuccessfully
        ? EngMessageConstant.ConfirmedStoreRegistrationSuccessfully
        : response === EngMessageConstant.CreatedNewCategorySuccessfully
        ? EngMessageConstant.CreatedNewCategorySuccessfully
        : response === EngMessageConstant.UpdatedCategorySuccessfully
        ? EngMessageConstant.UpdatedCategorySuccessfully
        : response === EngMessageConstant.DeletedCategorySuccessfully
        ? EngMessageConstant.DeletedCategorySuccessfully
        : response === EngMessageConstant.CreatedExtraCategoriesToNormalCategorySuccessfully
        ? EngMessageConstant.CreatedExtraCategoriesToNormalCategorySuccessfully
        : response === EngMessageConstant.CreatedNewBankingAccountSuccessfully
        ? EngMessageConstant.CreatedNewBankingAccountSuccessfully
        : response === EngMessageConstant.DeletedBankingAccountSuccessfully
        ? EngMessageConstant.DeletedBankingAccountSuccessfully
        : response === EngMessageConstant.UpdatedStatusBankingAccountSuccessfully
        ? EngMessageConstant.UpdatedStatusBankingAccountSuccessfully
        : response === EngMessageConstant.UpdatedBankingAccountSuccessfully
        ? EngMessageConstant.UpdatedBankingAccountSuccessfully
        : response === EngMessageConstant.CreatedNewProductSuccessfully
        ? EngMessageConstant.CreatedNewProductSuccessfully
        : response === EngMessageConstant.UpdatedProductSuccessfully
        ? EngMessageConstant.UpdatedProductSuccessfully
        : response === EngMessageConstant.UpdatedProductStatusSuccessfully
        ? EngMessageConstant.UpdatedProductStatusSuccessfully
        : response === EngMessageConstant.CreatedPartnerSuccessfully
        ? EngMessageConstant.CreatedPartnerSuccessfully
        : response === EngMessageConstant.DeletedProductSuccessfully
        ? EngMessageConstant.DeletedProductSuccessfully
        : response === EngMessageConstant.UpdatedPartnerSuccessfully
        ? EngMessageConstant.UpdatedPartnerSuccessfully
        : response === EngMessageConstant.UpdatedPartnerStatusSuccessfully
        ? EngMessageConstant.UpdatedPartnerStatusSuccessfully
        : response === EngMessageConstant.DeletedPartnerSuccessfully
        ? EngMessageConstant.DeletedPartnerSuccessfully
        : response === EngMessageConstant.CreatedNewStorePartnerSuccessfully
        ? EngMessageConstant.CreatedNewStorePartnerSuccessfully
        : response === EngMessageConstant.DeletedStorePartnerSuccessfully
        ? EngMessageConstant.DeletedStorePartnerSuccessfully
        : response === EngMessageConstant.UpdatedStatusStorePartnerSuccessfully
        ? EngMessageConstant.UpdatedStatusStorePartnerSuccessfully
        : response === EngMessageConstant.UpdatedStorePartnerSuccessfully
        ? EngMessageConstant.UpdatedStorePartnerSuccessfully
        : response === EngMessageConstant.UpdatedStorePartnerStatusSuccessfully
        ? EngMessageConstant.UpdatedStorePartnerStatusSuccessfully
        : response === EngMessageConstant.CreatedCashierSuccessfully
        ? EngMessageConstant.CreatedCashierSuccessfully
        : response === EngMessageConstant.UpdatedCashierSuccessfully
        ? EngMessageConstant.UpdatedCashierSuccessfully
        : response === EngMessageConstant.UpdatedCashierStatusSuccessfully
        ? EngMessageConstant.UpdatedCashierStatusSuccessfully
        : response === EngMessageConstant.DeletedCashierSuccessfully
        ? EngMessageConstant.DeletedCashierSuccessfully
        : response === EngMessageConstant.UpdatedCashierProfileSuccessfully
        ? EngMessageConstant.UpdatedCashierProfileSuccessfully
        : response === EngMessageConstant.CreatedPartnerProductSuccessfully
        ? EngMessageConstant.CreatedPartnerProductSuccessfully
        : response === EngMessageConstant.UpdatedPartnerProductSuccessfully
        ? EngMessageConstant.UpdatedPartnerProductSuccessfully
        : response === EngMessageConstant.DeletedPartnerProductSuccessfully
        ? EngMessageConstant.DeletedPartnerProductSuccessfully
        : response === EngMessageConstant.UpdatedPartnerProductStatusSuccessfully
        ? EngMessageConstant.UpdatedPartnerProductStatusSuccessfully
        : response === EngMessageConstant.UpdatedConfigurationsSuccessfully
        ? EngMessageConstant.UpdatedConfigurationsSuccessfully
        : response === EngMessageConstant.UpdateOrderSuccessfully
        ? EngMessageConstant.UpdateOrderSuccessfully
        : response === EngMessageConstant.MoneyExchangeToKitchenCenterSuccessfully
        ? EngMessageConstant.MoneyExchangeToKitchenCenterSuccessfully
        : response === EngMessageConstant.WithdrawMoneySuccessfully
        ? EngMessageConstant.WithdrawMoneySuccessfully
        : response === EngMessageConstant.UpdateSchedulingTimeJob
        ? EngMessageConstant.UpdateSchedulingTimeJob
        : response === EngErrorMessageConstant.notAccessSystem // error message
        ? EngErrorMessageConstant.notAccessSystem
        : response === EngErrorMessageConstant.imageIsNotNull
        ? EngErrorMessageConstant.imageIsNotNull
        : response === EngErrorMessageConstant.logoIsNotNull
        ? EngErrorMessageConstant.logoIsNotNull
        : response === EngErrorMessageConstant.NotExistEmail
        ? EngErrorMessageConstant.NotExistEmail
        : response === EngErrorMessageConstant.AlreadyExistEmail
        ? EngErrorMessageConstant.AlreadyExistEmail
        : response === EngErrorMessageConstant.AlreadyExistCitizenNumber
        ? EngErrorMessageConstant.AlreadyExistCitizenNumber
        : response === EngErrorMessageConstant.InvalidKitchenCenterId
        ? EngErrorMessageConstant.InvalidKitchenCenterId
        : response === EngErrorMessageConstant.InvalidBrandId
        ? EngErrorMessageConstant.InvalidBrandId
        : response === EngErrorMessageConstant.InvalidStoreId
        ? EngErrorMessageConstant.InvalidStoreId
        : response === EngErrorMessageConstant.InvalidCategoryId
        ? EngErrorMessageConstant.InvalidCategoryId
        : response === EngErrorMessageConstant.InvalidBankingAccountId
        ? EngErrorMessageConstant.InvalidBankingAccountId
        : response === EngErrorMessageConstant.InvalidCashierId
        ? EngErrorMessageConstant.InvalidCashierId
        : response === EngErrorMessageConstant.InvalidProductId
        ? EngErrorMessageConstant.InvalidProductId
        : response === EngErrorMessageConstant.NotExistKitchenCenterId
        ? EngErrorMessageConstant.NotExistKitchenCenterId
        : response === EngErrorMessageConstant.NotExistKitchenCenter
        ? EngErrorMessageConstant.NotExistKitchenCenter
        : response === EngErrorMessageConstant.NotExistBrandId
        ? EngErrorMessageConstant.NotExistBrandId
        : response === EngErrorMessageConstant.NotExistStoreId
        ? EngErrorMessageConstant.NotExistStoreId
        : response === EngErrorMessageConstant.NotExistCategoryId
        ? EngErrorMessageConstant.NotExistCategoryId
        : response === EngErrorMessageConstant.NotExistBankingAccountId
        ? EngErrorMessageConstant.NotExistBankingAccountId
        : response === EngErrorMessageConstant.NotExistProductId
        ? EngErrorMessageConstant.NotExistProductId
        : response === EngErrorMessageConstant.NotExistCashierId
        ? EngErrorMessageConstant.NotExistCashierId
        : response === EngErrorMessageConstant.InvalidItemsPerPage
        ? EngErrorMessageConstant.InvalidItemsPerPage
        : response === EngErrorMessageConstant.InvalidCurrentPage
        ? EngErrorMessageConstant.InvalidCurrentPage
        : response === EngErrorMessageConstant.NotExistPartnerId
        ? EngErrorMessageConstant.NotExistPartnerId
        : response === EngErrorMessageConstant.NotExistAccountId
        ? EngErrorMessageConstant.NotExistAccountId
        : response === EngErrorMessageConstant.InvalidPartnerId
        ? EngErrorMessageConstant.InvalidPartnerId
        : response === EngErrorMessageConstant.CategoryIdNotBelongToBrand
        ? EngErrorMessageConstant.CategoryIdNotBelongToBrand
        : response === EngErrorMessageConstant.CategoryIdNotBelongToStore
        ? EngErrorMessageConstant.CategoryIdNotBelongToStore
        : response === EngErrorMessageConstant.AlreadyExistPartnerProduct
        ? EngErrorMessageConstant.AlreadyExistPartnerProduct
        : response === EngErrorMessageConstant.NotExistPartnerProduct
        ? EngErrorMessageConstant.NotExistPartnerProduct
        : response === EngErrorMessageConstant.DisabledAccount
        ? EngErrorMessageConstant.DisabledAccount
        : response === EngErrorMessageConstant.InvalidEmailOrPassword
        ? EngErrorMessageConstant.InvalidEmailOrPassword
        : response === EngErrorMessageConstant.AccountIdNotBelongYourAccount
        ? EngErrorMessageConstant.AccountIdNotBelongYourAccount
        : response === EngErrorMessageConstant.NotAuthenticatedEmailBefore
        ? EngErrorMessageConstant.NotAuthenticatedEmailBefore
        : response === EngErrorMessageConstant.ExpiredOTPCode
        ? EngErrorMessageConstant.ExpiredOTPCode
        : response === EngErrorMessageConstant.NotMatchOTPCode
        ? EngErrorMessageConstant.NotMatchOTPCode
        : response === EngErrorMessageConstant.InvalidAccessToken
        ? EngErrorMessageConstant.InvalidAccessToken
        : response === EngErrorMessageConstant.NotExpiredAccessToken
        ? EngErrorMessageConstant.NotExpiredAccessToken
        : response === EngErrorMessageConstant.NotExistAuthenticationToken
        ? EngErrorMessageConstant.NotExistAuthenticationToken
        : response === EngErrorMessageConstant.NotExistRefreshToken
        ? EngErrorMessageConstant.NotExistRefreshToken
        : response === EngErrorMessageConstant.NotMatchAccessToken
        ? EngErrorMessageConstant.NotMatchAccessToken
        : response === EngErrorMessageConstant.ExpiredRefreshToken
        ? EngErrorMessageConstant.ExpiredRefreshToken
        : response === EngErrorMessageConstant.NotAuthenticatedEmail
        ? EngErrorMessageConstant.NotAuthenticatedEmail
        : response === EngErrorMessageConstant.NotVerifiedEmail
        ? EngErrorMessageConstant.NotVerifiedEmail
        : response === EngErrorMessageConstant.DeactiveKitchenCenter_Update
        ? EngErrorMessageConstant.DeactiveKitchenCenter_Update
        : response === EngErrorMessageConstant.KitchenCenterManagerEmailExisted
        ? EngErrorMessageConstant.KitchenCenterManagerEmailExisted
        : response === EngErrorMessageConstant.ExistedActiveStores_Delete
        ? EngErrorMessageConstant.ExistedActiveStores_Delete
        : response === EngErrorMessageConstant.NotBelongToKitchenCenter
        ? EngErrorMessageConstant.NotBelongToKitchenCenter
        : response === EngErrorMessageConstant.InvalidStatusFilter
        ? EngErrorMessageConstant.InvalidStatusFilter
        : response === EngErrorMessageConstant.NotBelongToBrand
        ? EngErrorMessageConstant.NotBelongToBrand
        : response === EngErrorMessageConstant.DeactiveBrand_Delete
        ? EngErrorMessageConstant.DeactiveBrand_Delete
        : response === EngErrorMessageConstant.DeactiveBrand_Update
        ? EngErrorMessageConstant.DeactiveBrand_Update
        : response === EngErrorMessageConstant.BrandManagerEmailExisted
        ? EngErrorMessageConstant.BrandManagerEmailExisted
        : response === EngErrorMessageConstant.RoleNotSuitable
        ? EngErrorMessageConstant.RoleNotSuitable
        : response === EngErrorMessageConstant.ProductNotBelongToBrand
        ? EngErrorMessageConstant.ProductNotBelongToBrand
        : response === EngErrorMessageConstant.KeySortNotExist
        ? EngErrorMessageConstant.KeySortNotExist
        : response === EngErrorMessageConstant.BrandNotJoinKitchenCenter
        ? EngErrorMessageConstant.BrandNotJoinKitchenCenter
        : response === EngErrorMessageConstant.KitchenCenterNotHaveBrand
        ? EngErrorMessageConstant.KitchenCenterNotHaveBrand
        : response === EngErrorMessageConstant.BrandNotHaveStore
        ? EngErrorMessageConstant.BrandNotHaveStore
        : response === EngErrorMessageConstant.KitchenCenterNotHaveStore
        ? EngErrorMessageConstant.KitchenCenterNotHaveStore
        : response === EngErrorMessageConstant.DeactiveStore_Update
        ? EngErrorMessageConstant.DeactiveStore_Update
        : response === EngErrorMessageConstant.DeactiveStore_Delete
        ? EngErrorMessageConstant.DeactiveStore_Delete
        : response === EngErrorMessageConstant.ManageremailExisted
        ? EngErrorMessageConstant.ManageremailExisted
        : response === EngErrorMessageConstant.NotConfirmingStore
        ? EngErrorMessageConstant.NotConfirmingStore
        : response === EngErrorMessageConstant.NotRejectedResonForNewStore
        ? EngErrorMessageConstant.NotRejectedResonForNewStore
        : response === EngErrorMessageConstant.StoreIdNotBelongToStore
        ? EngErrorMessageConstant.StoreIdNotBelongToStore
        : response === EngErrorMessageConstant.StoresWithStatusNameParam
        ? EngErrorMessageConstant.StoresWithStatusNameParam
        : response === EngErrorMessageConstant.CategoryCodeExisted
        ? EngErrorMessageConstant.CategoryCodeExisted
        : response === EngErrorMessageConstant.DeactiveCategory_Delete
        ? EngErrorMessageConstant.DeactiveCategory_Delete
        : response === EngErrorMessageConstant.DeactiveCategory_Update
        ? EngErrorMessageConstant.DeactiveCategory_Update
        : response === EngErrorMessageConstant.InvalidCategoryType
        ? EngErrorMessageConstant.InvalidCategoryType
        : response === EngErrorMessageConstant.NotExistCategoryType
        ? EngErrorMessageConstant.NotExistCategoryType
        : response === EngErrorMessageConstant.StatusInvalid
        ? EngErrorMessageConstant.StatusInvalid
        : response === EngErrorMessageConstant.CategoryMustBeNormal
        ? EngErrorMessageConstant.CategoryMustBeNormal
        : response === EngErrorMessageConstant.ExtraCategoryGreaterThan0
        ? EngErrorMessageConstant.ExtraCategoryGreaterThan0
        : response === EngErrorMessageConstant.ListExtraCategoryIdIsExtraType
        ? EngErrorMessageConstant.ListExtraCategoryIdIsExtraType
        : response === EngErrorMessageConstant.ListExtraCategoryIdIsActive
        ? EngErrorMessageConstant.ListExtraCategoryIdIsActive
        : response === EngErrorMessageConstant.ExtraCategoryIdNotBelongToBrand
        ? EngErrorMessageConstant.ExtraCategoryIdNotBelongToBrand
        : response === EngErrorMessageConstant.ExtraCategoryIdDoesNotExist
        ? EngErrorMessageConstant.ExtraCategoryIdDoesNotExist
        : response === EngErrorMessageConstant.BankingAccountNotBelongToKitchenCenter
        ? EngErrorMessageConstant.BankingAccountNotBelongToKitchenCenter
        : response === EngErrorMessageConstant.NumberAccountExisted
        ? EngErrorMessageConstant.NumberAccountExisted
        : response === EngErrorMessageConstant.ProductCodeExisted
        ? EngErrorMessageConstant.ProductCodeExisted
        : response === EngErrorMessageConstant.ParentProductIdNotExist
        ? EngErrorMessageConstant.ParentProductIdNotExist
        : response === EngErrorMessageConstant.ParentProductIdNotBelongToBrand
        ? EngErrorMessageConstant.ParentProductIdNotBelongToBrand
        : response === EngErrorMessageConstant.CategoryNotSuitableForSingleOrParentProductType
        ? EngErrorMessageConstant.CategoryNotSuitableForSingleOrParentProductType
        : response === EngErrorMessageConstant.CategoryNotSuitableForEXTRAProductType
        ? EngErrorMessageConstant.CategoryNotSuitableForEXTRAProductType
        : response === EngErrorMessageConstant.CategoryIdNotBelongToKitchenCenter
        ? EngErrorMessageConstant.CategoryIdNotBelongToKitchenCenter
        : response === EngErrorMessageConstant.InvalidProductType
        ? EngErrorMessageConstant.InvalidProductType
        : response === EngErrorMessageConstant.ProductNotBelongToStore
        ? EngErrorMessageConstant.ProductNotBelongToStore
        : response === EngErrorMessageConstant.ProductNotSpendToStore
        ? EngErrorMessageConstant.ProductNotSpendToStore
        : response === EngErrorMessageConstant.ProductNameNotFollowingFormat
        ? EngErrorMessageConstant.ProductNameNotFollowingFormat
        : response === EngErrorMessageConstant.ProductNameTypeChildNotAllowUpdate
        ? EngErrorMessageConstant.ProductNameTypeChildNotAllowUpdate
        : response === EngErrorMessageConstant.ProductIdNotParentType
        ? EngErrorMessageConstant.ProductIdNotParentType
        : response === EngErrorMessageConstant.DupplicatedPartnerName
        ? EngErrorMessageConstant.DupplicatedPartnerName
        : response === EngErrorMessageConstant.DupplicatedWebUrl
        ? EngErrorMessageConstant.DupplicatedWebUrl
        : response === EngErrorMessageConstant.DeactivePartner_Update
        ? EngErrorMessageConstant.DeactivePartner_Update
        : response === EngErrorMessageConstant.DeactivePartner_Delete
        ? EngErrorMessageConstant.DeactivePartner_Delete
        : response === EngErrorMessageConstant.DeactivePartner_Get
        ? EngErrorMessageConstant.DeactivePartner_Get
        : response === EngErrorMessageConstant.PartnerHasPartnerStoreActive_Update
        ? EngErrorMessageConstant.PartnerHasPartnerStoreActive_Update
        : response === EngErrorMessageConstant.PartnerHasPartnerStoreActive_Delete
        ? EngErrorMessageConstant.PartnerHasPartnerStoreActive_Delete
        : response === EngErrorMessageConstant.CashierIdNotBelongToKitchenCenter
        ? EngErrorMessageConstant.CashierIdNotBelongToKitchenCenter
        : response === EngErrorMessageConstant.CashierIdNotBelogToCashier
        ? EngErrorMessageConstant.CashierIdNotBelogToCashier
        : response === EngErrorMessageConstant.StatusIsRequiredWithKitchenCenterManager
        ? EngErrorMessageConstant.StatusIsRequiredWithKitchenCenterManager
        : response === EngErrorMessageConstant.StatusIsNotRequiredWithCashier
        ? EngErrorMessageConstant.StatusIsNotRequiredWithCashier
        : response === EngErrorMessageConstant.InactiveStore_Create
        ? EngErrorMessageConstant.InactiveStore_Create
        : response === EngErrorMessageConstant.StoreNotBelongToBrand
        ? EngErrorMessageConstant.StoreNotBelongToBrand
        : response === EngErrorMessageConstant.LinkedWithParner
        ? EngErrorMessageConstant.LinkedWithParner
        : response === EngErrorMessageConstant.UsernameExisted
        ? EngErrorMessageConstant.UsernameExisted
        : response === EngErrorMessageConstant.NotLinkedWithParner
        ? EngErrorMessageConstant.NotLinkedWithParner
        : response === EngErrorMessageConstant.DeactiveStorePartner_Update
        ? EngErrorMessageConstant.DeactiveStorePartner_Update
        : response === EngErrorMessageConstant.DupplicatedPartnerId_Create
        ? EngErrorMessageConstant.DupplicatedPartnerId_Create
        : response === EngErrorMessageConstant.GrabFoodAccountMustBeStoreManager
        ? EngErrorMessageConstant.GrabFoodAccountMustBeStoreManager
        : response === EngErrorMessageConstant.ItemOnGrabfoodCanNotMapping
        ? EngErrorMessageConstant.ItemOnGrabfoodCanNotMapping
        : response === EngErrorMessageConstant.ModifierGroupOnGrabfoodCanNotMapping
        ? EngErrorMessageConstant.ModifierGroupOnGrabfoodCanNotMapping
        : response === EngErrorMessageConstant.DeactiveProduct_Create_Update
        ? EngErrorMessageConstant.DeactiveProduct_Create_Update
        : response === EngErrorMessageConstant.InactiveProduct_Create_Update
        ? EngErrorMessageConstant.InactiveProduct_Create_Update
        : response === EngErrorMessageConstant.InactiveStore_Update
        ? EngErrorMessageConstant.InactiveStore_Update
        : response === EngErrorMessageConstant.StatusInValid
        ? EngErrorMessageConstant.StatusInValid
        : response === EngErrorMessageConstant.OrderNotBelongToKitchenCenter
        ? EngErrorMessageConstant.OrderNotBelongToKitchenCenter
        : response === EngErrorMessageConstant.OrderShipperPhoneNotMatch
        ? EngErrorMessageConstant.OrderShipperPhoneNotMatch
        : response === EngErrorMessageConstant.OrderIsPreparing
        ? EngErrorMessageConstant.OrderIsPreparing
        : response === EngErrorMessageConstant.OrderIsReady
        ? EngErrorMessageConstant.OrderIsReady
        : response === EngErrorMessageConstant.OrderIsUpcoming
        ? EngErrorMessageConstant.OrderIsUpcoming
        : response === EngErrorMessageConstant.OrderIsCompleted
        ? EngErrorMessageConstant.OrderIsCompleted
        : response === EngErrorMessageConstant.OrderIsCancelled
        ? EngErrorMessageConstant.OrderIsCancelled
        : response === EngErrorMessageConstant.OrderAlreadyPaid
        ? EngErrorMessageConstant.OrderAlreadyPaid
        : response === EngErrorMessageConstant.OrderPartnerIdNotExist
        ? EngErrorMessageConstant.OrderPartnerIdNotExist
        : response === EngErrorMessageConstant.OrderPartnerIdAlreadyExist
        ? EngErrorMessageConstant.OrderPartnerIdAlreadyExist
        : response === EngErrorMessageConstant.DisplayIdAlreadyExist
        ? EngErrorMessageConstant.DisplayIdAlreadyExist
        : response === EngErrorMessageConstant.ProductPartnerNotMappingBefore
        ? EngErrorMessageConstant.ProductPartnerNotMappingBefore
        : response === EngErrorMessageConstant.ProductExtraPartnerNotMappingBefore
        ? EngErrorMessageConstant.ProductExtraPartnerNotMappingBefore
        : response === EngErrorMessageConstant.ProductInOrderNotExistInTheSystem
        ? EngErrorMessageConstant.ProductInOrderNotExistInTheSystem
        : response === EngErrorMessageConstant.ProductExtraInOrderDetailNotExistInTheSystem
        ? EngErrorMessageConstant.ProductExtraInOrderDetailNotExistInTheSystem
        : response === EngErrorMessageConstant.OrderIdNotExist
        ? EngErrorMessageConstant.OrderIdNotExist
        : response === EngErrorMessageConstant.OrderIdNotBelongToStore
        ? EngErrorMessageConstant.OrderIdNotBelongToStore
        : response === EngErrorMessageConstant.OrderIdNotBelongToKitchenCenter
        ? EngErrorMessageConstant.OrderIdNotBelongToKitchenCenter
        : response === EngErrorMessageConstant.OrderIsReady_Change_To_Ready
        ? EngErrorMessageConstant.OrderIsReady_Change_To_Ready
        : response === EngErrorMessageConstant.OrderIsUpcoming_Change_To_Ready
        ? EngErrorMessageConstant.OrderIsUpcoming_Change_To_Ready
        : response === EngErrorMessageConstant.OrderIsCompleted_Change_To_Ready
        ? EngErrorMessageConstant.OrderIsCompleted_Change_To_Ready
        : response === EngErrorMessageConstant.OrderIsCancelled_Change_To_Ready
        ? EngErrorMessageConstant.OrderIsCancelled_Change_To_Ready
        : response === EngErrorMessageConstant.OrderIsReadyDelivery_Change_To_Ready
        ? EngErrorMessageConstant.OrderIsReadyDelivery_Change_To_Ready
        : response === EngErrorMessageConstant.OrderIsPreparing_Change_To_ReadyDelivery
        ? EngErrorMessageConstant.OrderIsPreparing_Change_To_ReadyDelivery
        : response === EngErrorMessageConstant.OrderIsUpcoming_Change_To_ReadyDelivery
        ? EngErrorMessageConstant.OrderIsUpcoming_Change_To_ReadyDelivery
        : response === EngErrorMessageConstant.OrderIsCompeleted_Change_To_ReadyDelivery
        ? EngErrorMessageConstant.OrderIsCompeleted_Change_To_ReadyDelivery
        : response === EngErrorMessageConstant.OrderIsCancelled_Change_To_ReadyDelivery
        ? EngErrorMessageConstant.OrderIsCancelled_Change_To_ReadyDelivery
        : response === EngErrorMessageConstant.OrderIsReadyDelivery_Change_To_ReadyDelivery
        ? EngErrorMessageConstant.OrderIsReadyDelivery_Change_To_ReadyDelivery
        : response === EngErrorMessageConstant.OrderIsReady_Cancel
        ? EngErrorMessageConstant.OrderIsReady_Cancel
        : response === EngErrorMessageConstant.OrderIsCompleted_Cancel
        ? EngErrorMessageConstant.OrderIsCompleted_Cancel
        : response === EngErrorMessageConstant.OrderIsCancelled_Cancel
        ? EngErrorMessageConstant.OrderIsCancelled_Cancel
        : response === EngErrorMessageConstant.OrderIsReadyDelivery_Cancel
        ? EngErrorMessageConstant.OrderIsReadyDelivery_Cancel
        : response === EngErrorMessageConstant.NoChangeOrderStatusWhenClosedShift
        ? EngErrorMessageConstant.NoChangeOrderStatusWhenClosedShift
        : response === EngErrorMessageConstant.BalanceIsInvalid
        ? EngErrorMessageConstant.BalanceIsInvalid
        : response === EngErrorMessageConstant.BalanceIsInvalid
        ? EngErrorMessageConstant.BalanceIsInvalid
        : response === EngErrorMessageConstant.StoreIdNotBelogToKitchenCenter
        ? EngErrorMessageConstant.StoreIdNotBelogToKitchenCenter
        : response === EngErrorMessageConstant.BalanceDoesNotEnough
        ? EngErrorMessageConstant.BalanceDoesNotEnough
        : response === EngErrorMessageConstant.AlreadyTransferredToStore
        ? EngErrorMessageConstant.AlreadyTransferredToStore
        : response === EngErrorMessageConstant.AlreadyTransferredToKitchenCenter
        ? EngErrorMessageConstant.AlreadyTransferredToKitchenCenter
        : response === EngErrorMessageConstant.TransferToStoreSuccessfully
        ? EngErrorMessageConstant.TransferToStoreSuccessfully
        : response === EngErrorMessageConstant.TransferToKitchenCenterSuccessfully
        ? EngErrorMessageConstant.TransferToKitchenCenterSuccessfully
        : response === EngErrorMessageConstant.NotExistJobId
        ? EngErrorMessageConstant.NotExistJobId
        : response === EngErrorMessageConstant.ConfigDoesNotExist
        ? EngErrorMessageConstant.ConfigDoesNotExist
        : response === EngErrorMessageConstant.NotExistOrderPartnerId
        ? EngErrorMessageConstant.NotExistOrderPartnerId
        : response === EngErrorMessageConstant.AccountNoLongerActive
        ? EngErrorMessageConstant.AccountNoLongerActive
        : response === EngErrorMessageConstant.NoOneKitchenCenterAvailable
        ? EngErrorMessageConstant.NoOneKitchenCenterAvailable
        : response === EngErrorMessageConstant.StoreIdDoesNotExisted
        ? EngErrorMessageConstant.StoreIdDoesNotExisted
        : response === EngErrorMessageConstant.StoreIdNotBelongToBrand
        ? EngErrorMessageConstant.StoreIdNotBelongToBrand
        : response === EngErrorMessageConstant.CategoryCodeExistedInBrand
        ? EngErrorMessageConstant.CategoryCodeExistedInBrand
        : response === EngErrorMessageConstant.ProductIdNotBelongToBrand
        ? EngErrorMessageConstant.ProductIdNotBelongToBrand
        : response === EngErrorMessageConstant.InvalidProductTypeParent
        ? EngErrorMessageConstant.InvalidProductTypeParent
        : response === EngErrorMessageConstant.InvalidProductTypeChild
        ? EngErrorMessageConstant.InvalidProductTypeChild
        : response === EngErrorMessageConstant.InvalidProductTypeSingle
        ? EngErrorMessageConstant.InvalidProductTypeSingle
        : response === EngErrorMessageConstant.InvalidProductTypeExtra
        ? EngErrorMessageConstant.InvalidProductTypeExtra
        : response === EngErrorMessageConstant.InvalidOnField
        ? EngErrorMessageConstant.InvalidOnField
        : response === EngErrorMessageConstant.NoOneCashierAvailable
        ? EngErrorMessageConstant.NoOneCashierAvailable
        : response === EngErrorMessageConstant.BrandHasNoActiveProduct
        ? EngErrorMessageConstant.BrandHasNoActiveProduct
        : response === EngErrorMessageConstant.ParentProductMappingNotYet
        ? EngErrorMessageConstant.ParentProductMappingNotYet
        : response === EngErrorMessageConstant.ProductCodeExistedInTheSystem
        ? EngErrorMessageConstant.ProductCodeExistedInTheSystem
        : response === EngErrorMessageConstant.StatusInValid
        ? EngErrorMessageConstant.StatusInValid
        : response === EngErrorMessageConstant.ProductCodeNotExistInGrabFoodSystem
        ? EngErrorMessageConstant.ProductCodeNotExistInGrabFoodSystem
        : response === EngErrorMessageConstant.PriceNotMatchWithProductInGrabFoodSystem
        ? EngErrorMessageConstant.PriceNotMatchWithProductInGrabFoodSystem
        : response === EngErrorMessageConstant.StatusNotMatchWithProductInGrabFoodSystem
        ? EngErrorMessageConstant.StatusNotMatchWithProductInGrabFoodSystem
        : response === EngErrorMessageConstant.ProductPartnerNotAvailableNow
        ? EngErrorMessageConstant.ProductPartnerNotAvailableNow
        : response === EngErrorMessageConstant.ProductPriceNotMatchWithPartnerProduct
        ? EngErrorMessageConstant.ProductPriceNotMatchWithPartnerProduct
        : response === EngErrorMessageConstant.ExtraProductPriceNotMatchWithPartnerProduct
        ? EngErrorMessageConstant.ExtraProductPriceNotMatchWithPartnerProduct
        : response === EngErrorMessageConstant.NoOneOutOfStock
        ? EngErrorMessageConstant.NoOneOutOfStock
        : response === EngErrorMessageConstant.UpdatePartnerProductSuccessfully
        ? EngErrorMessageConstant.UpdatePartnerProductSuccessfully
        : response === EngErrorMessageConstant.NoChangeOrderStatusNotToday
        ? EngErrorMessageConstant.NoChangeOrderStatusNotToday
        : response === EngErrorMessageConstant.StoreBalanceIsInvalid
        ? EngErrorMessageConstant.StoreBalanceIsInvalid
        : response === EngErrorMessageConstant.NoOneOutOfStock
        ? EngErrorMessageConstant.NoOneOutOfStock
        : response === EngErrorMessageConstant.avatarIsNotNull
        ? EngErrorMessageConstant.avatarIsNotNull
        : response === EngErrorMessageConstant.IdNotSuitable
        ? EngErrorMessageConstant.IdNotSuitable
        : response === EngErrorMessageConstant.KitchenCenterIdNotSuitable
        ? EngErrorMessageConstant.KitchenCenterIdNotSuitable
        : response === EngErrorMessageConstant.BrandIdNotSuitable
        ? EngErrorMessageConstant.BrandIdNotSuitable
        : response === EngErrorMessageConstant.CategoryIdNotSuitable
        ? EngErrorMessageConstant.CategoryIdNotSuitable
        : response === EngErrorMessageConstant.ProductIdNotSuitable
        ? EngErrorMessageConstant.ProductIdNotSuitable
        : response
      : currentLanguage === Language.VIETNAMESE
      ? response === EngMessageConstant.LoginSuccessfully
        ? VieMessageConstant.LoginSuccessfully
        : response === EngMessageConstant.ResetPasswordSuccessfully
        ? VieMessageConstant.ResetPasswordSuccessfully
        : response === EngMessageConstant.UpdateAccountSuccessfully
        ? VieMessageConstant.UpdateAccountSuccessfully
        : response === EngMessageConstant.SentEmailConfirmationSuccessfully
        ? VieMessageConstant.SentEmailConfirmationSuccessfully
        : response === EngMessageConstant.ConfirmedOTPCodeSuccessfully
        ? VieMessageConstant.ConfirmedOTPCodeSuccessfully
        : response === EngMessageConstant.CreatedNewKitchenCenterSuccessfully
        ? VieMessageConstant.CreatedNewKitchenCenterSuccessfully
        : response === EngMessageConstant.UpdatedKitchenCenterSuccessfully
        ? VieMessageConstant.UpdatedKitchenCenterSuccessfully
        : response === EngMessageConstant.UpdatedKitchenCenterStatusSuccessfully
        ? VieMessageConstant.UpdatedKitchenCenterStatusSuccessfully
        : response === EngMessageConstant.DeletedKitchenCenterSuccessfully
        ? VieMessageConstant.DeletedKitchenCenterSuccessfully
        : response === EngMessageConstant.CreatedNewBrandSuccessfully
        ? VieMessageConstant.CreatedNewBrandSuccessfully
        : response === EngMessageConstant.UpdatedBrandSuccessfully
        ? VieMessageConstant.UpdatedBrandSuccessfully
        : response === EngMessageConstant.UpdatedBrandStatusSuccessfully
        ? VieMessageConstant.UpdatedBrandStatusSuccessfully
        : response === EngMessageConstant.UpdatedBrandProfileSuccessfully
        ? VieMessageConstant.UpdatedBrandProfileSuccessfully
        : response === EngMessageConstant.DeletedBrandSuccessfully
        ? VieMessageConstant.DeletedBrandSuccessfully
        : response === EngMessageConstant.UpdatedStoreStatusSuccessfully
        ? VieMessageConstant.UpdatedStoreStatusSuccessfully
        : response === EngMessageConstant.UpdatedStoreInformationSuccessfully
        ? VieMessageConstant.UpdatedStoreInformationSuccessfully
        : response === EngMessageConstant.DeletedStoreSuccessfully
        ? VieMessageConstant.DeletedStoreSuccessfully
        : response === EngMessageConstant.RegisteredNewStoreSuccessfully
        ? VieMessageConstant.RegisteredNewStoreSuccessfully
        : response === EngMessageConstant.ConfirmedStoreRegistrationSuccessfully
        ? VieMessageConstant.ConfirmedStoreRegistrationSuccessfully
        : response === EngMessageConstant.CreatedNewCategorySuccessfully
        ? VieMessageConstant.CreatedNewCategorySuccessfully
        : response === EngMessageConstant.UpdatedCategorySuccessfully
        ? VieMessageConstant.UpdatedCategorySuccessfully
        : response === EngMessageConstant.DeletedCategorySuccessfully
        ? VieMessageConstant.DeletedCategorySuccessfully
        : response === EngMessageConstant.CreatedExtraCategoriesToNormalCategorySuccessfully
        ? VieMessageConstant.CreatedExtraCategoriesToNormalCategorySuccessfully
        : response === EngMessageConstant.CreatedNewBankingAccountSuccessfully
        ? VieMessageConstant.CreatedNewBankingAccountSuccessfully
        : response === EngMessageConstant.DeletedBankingAccountSuccessfully
        ? VieMessageConstant.DeletedBankingAccountSuccessfully
        : response === EngMessageConstant.UpdatedStatusBankingAccountSuccessfully
        ? VieMessageConstant.UpdatedStatusBankingAccountSuccessfully
        : response === EngMessageConstant.UpdatedBankingAccountSuccessfully
        ? VieMessageConstant.UpdatedBankingAccountSuccessfully
        : response === EngMessageConstant.CreatedNewProductSuccessfully
        ? VieMessageConstant.CreatedNewProductSuccessfully
        : response === EngMessageConstant.UpdatedProductSuccessfully
        ? VieMessageConstant.UpdatedProductSuccessfully
        : response === EngMessageConstant.UpdatedProductStatusSuccessfully
        ? VieMessageConstant.UpdatedProductStatusSuccessfully
        : response === EngMessageConstant.CreatedPartnerSuccessfully
        ? VieMessageConstant.CreatedPartnerSuccessfully
        : response === EngMessageConstant.DeletedProductSuccessfully
        ? VieMessageConstant.DeletedProductSuccessfully
        : response === EngMessageConstant.UpdatedPartnerSuccessfully
        ? VieMessageConstant.UpdatedPartnerSuccessfully
        : response === EngMessageConstant.UpdatedPartnerStatusSuccessfully
        ? VieMessageConstant.UpdatedPartnerStatusSuccessfully
        : response === EngMessageConstant.DeletedPartnerSuccessfully
        ? VieMessageConstant.DeletedPartnerSuccessfully
        : response === EngMessageConstant.CreatedNewStorePartnerSuccessfully
        ? VieMessageConstant.CreatedNewStorePartnerSuccessfully
        : response === EngMessageConstant.DeletedStorePartnerSuccessfully
        ? VieMessageConstant.DeletedStorePartnerSuccessfully
        : response === EngMessageConstant.UpdatedStatusStorePartnerSuccessfully
        ? VieMessageConstant.UpdatedStatusStorePartnerSuccessfully
        : response === EngMessageConstant.UpdatedStorePartnerSuccessfully
        ? VieMessageConstant.UpdatedStorePartnerSuccessfully
        : response === EngMessageConstant.UpdatedStorePartnerStatusSuccessfully
        ? VieMessageConstant.UpdatedStorePartnerStatusSuccessfully
        : response === EngMessageConstant.CreatedCashierSuccessfully
        ? VieMessageConstant.CreatedCashierSuccessfully
        : response === EngMessageConstant.UpdatedCashierSuccessfully
        ? VieMessageConstant.UpdatedCashierSuccessfully
        : response === EngMessageConstant.UpdatedCashierStatusSuccessfully
        ? VieMessageConstant.UpdatedCashierStatusSuccessfully
        : response === EngMessageConstant.DeletedCashierSuccessfully
        ? VieMessageConstant.DeletedCashierSuccessfully
        : response === EngMessageConstant.UpdatedCashierProfileSuccessfully
        ? VieMessageConstant.UpdatedCashierProfileSuccessfully
        : response === EngMessageConstant.CreatedPartnerProductSuccessfully
        ? VieMessageConstant.CreatedPartnerProductSuccessfully
        : response === EngMessageConstant.UpdatedPartnerProductSuccessfully
        ? VieMessageConstant.UpdatedPartnerProductSuccessfully
        : response === EngMessageConstant.DeletedPartnerProductSuccessfully
        ? VieMessageConstant.DeletedPartnerProductSuccessfully
        : response === EngMessageConstant.UpdatedPartnerProductStatusSuccessfully
        ? VieMessageConstant.UpdatedPartnerProductStatusSuccessfully
        : response === EngMessageConstant.UpdatedConfigurationsSuccessfully
        ? VieMessageConstant.UpdatedConfigurationsSuccessfully
        : response === EngMessageConstant.UpdateOrderSuccessfully
        ? VieMessageConstant.UpdateOrderSuccessfully
        : response === EngMessageConstant.MoneyExchangeToKitchenCenterSuccessfully
        ? VieMessageConstant.MoneyExchangeToKitchenCenterSuccessfully
        : response === EngMessageConstant.WithdrawMoneySuccessfully
        ? VieMessageConstant.WithdrawMoneySuccessfully
        : response === EngMessageConstant.UpdateSchedulingTimeJob
        ? VieMessageConstant.UpdateSchedulingTimeJob
        : response === EngErrorMessageConstant.notAccessSystem // error message
        ? VieErrorMessageConstant.notAccessSystem
        : response === EngErrorMessageConstant.imageIsNotNull
        ? VieErrorMessageConstant.imageIsNotNull
        : response === EngErrorMessageConstant.logoIsNotNull
        ? VieErrorMessageConstant.logoIsNotNull
        : response === EngErrorMessageConstant.NotExistEmail
        ? VieErrorMessageConstant.NotExistEmail
        : response === EngErrorMessageConstant.AlreadyExistEmail
        ? VieErrorMessageConstant.AlreadyExistEmail
        : response === EngErrorMessageConstant.AlreadyExistCitizenNumber
        ? VieErrorMessageConstant.AlreadyExistCitizenNumber
        : response === EngErrorMessageConstant.InvalidKitchenCenterId
        ? VieErrorMessageConstant.InvalidKitchenCenterId
        : response === EngErrorMessageConstant.InvalidBrandId
        ? VieErrorMessageConstant.InvalidBrandId
        : response === EngErrorMessageConstant.InvalidStoreId
        ? VieErrorMessageConstant.InvalidStoreId
        : response === EngErrorMessageConstant.InvalidCategoryId
        ? VieErrorMessageConstant.InvalidCategoryId
        : response === EngErrorMessageConstant.InvalidBankingAccountId
        ? VieErrorMessageConstant.InvalidBankingAccountId
        : response === EngErrorMessageConstant.InvalidCashierId
        ? VieErrorMessageConstant.InvalidCashierId
        : response === EngErrorMessageConstant.InvalidProductId
        ? VieErrorMessageConstant.InvalidProductId
        : response === EngErrorMessageConstant.NotExistKitchenCenterId
        ? VieErrorMessageConstant.NotExistKitchenCenterId
        : response === EngErrorMessageConstant.NotExistKitchenCenter
        ? VieErrorMessageConstant.NotExistKitchenCenter
        : response === EngErrorMessageConstant.NotExistBrandId
        ? VieErrorMessageConstant.NotExistBrandId
        : response === EngErrorMessageConstant.NotExistStoreId
        ? VieErrorMessageConstant.NotExistStoreId
        : response === EngErrorMessageConstant.NotExistCategoryId
        ? VieErrorMessageConstant.NotExistCategoryId
        : response === EngErrorMessageConstant.NotExistBankingAccountId
        ? VieErrorMessageConstant.NotExistBankingAccountId
        : response === EngErrorMessageConstant.NotExistProductId
        ? VieErrorMessageConstant.NotExistProductId
        : response === EngErrorMessageConstant.NotExistCashierId
        ? VieErrorMessageConstant.NotExistCashierId
        : response === EngErrorMessageConstant.InvalidItemsPerPage
        ? VieErrorMessageConstant.InvalidItemsPerPage
        : response === EngErrorMessageConstant.InvalidCurrentPage
        ? VieErrorMessageConstant.InvalidCurrentPage
        : response === EngErrorMessageConstant.NotExistPartnerId
        ? VieErrorMessageConstant.NotExistPartnerId
        : response === EngErrorMessageConstant.NotExistAccountId
        ? VieErrorMessageConstant.NotExistAccountId
        : response === EngErrorMessageConstant.InvalidPartnerId
        ? VieErrorMessageConstant.InvalidPartnerId
        : response === EngErrorMessageConstant.CategoryIdNotBelongToBrand
        ? VieErrorMessageConstant.CategoryIdNotBelongToBrand
        : response === EngErrorMessageConstant.CategoryIdNotBelongToStore
        ? VieErrorMessageConstant.CategoryIdNotBelongToStore
        : response === EngErrorMessageConstant.AlreadyExistPartnerProduct
        ? VieErrorMessageConstant.AlreadyExistPartnerProduct
        : response === EngErrorMessageConstant.NotExistPartnerProduct
        ? VieErrorMessageConstant.NotExistPartnerProduct
        : response === EngErrorMessageConstant.DisabledAccount
        ? VieErrorMessageConstant.DisabledAccount
        : response === EngErrorMessageConstant.InvalidEmailOrPassword
        ? VieErrorMessageConstant.InvalidEmailOrPassword
        : response === EngErrorMessageConstant.AccountIdNotBelongYourAccount
        ? VieErrorMessageConstant.AccountIdNotBelongYourAccount
        : response === EngErrorMessageConstant.NotAuthenticatedEmailBefore
        ? VieErrorMessageConstant.NotAuthenticatedEmailBefore
        : response === EngErrorMessageConstant.ExpiredOTPCode
        ? VieErrorMessageConstant.ExpiredOTPCode
        : response === EngErrorMessageConstant.NotMatchOTPCode
        ? VieErrorMessageConstant.NotMatchOTPCode
        : response === EngErrorMessageConstant.InvalidAccessToken
        ? VieErrorMessageConstant.InvalidAccessToken
        : response === EngErrorMessageConstant.NotExpiredAccessToken
        ? VieErrorMessageConstant.NotExpiredAccessToken
        : response === EngErrorMessageConstant.NotExistAuthenticationToken
        ? VieErrorMessageConstant.NotExistAuthenticationToken
        : response === EngErrorMessageConstant.NotExistRefreshToken
        ? VieErrorMessageConstant.NotExistRefreshToken
        : response === EngErrorMessageConstant.NotMatchAccessToken
        ? VieErrorMessageConstant.NotMatchAccessToken
        : response === EngErrorMessageConstant.ExpiredRefreshToken
        ? VieErrorMessageConstant.ExpiredRefreshToken
        : response === EngErrorMessageConstant.NotAuthenticatedEmail
        ? VieErrorMessageConstant.NotAuthenticatedEmail
        : response === EngErrorMessageConstant.NotVerifiedEmail
        ? VieErrorMessageConstant.NotVerifiedEmail
        : response === EngErrorMessageConstant.DeactiveKitchenCenter_Update
        ? VieErrorMessageConstant.DeactiveKitchenCenter_Update
        : response === EngErrorMessageConstant.KitchenCenterManagerEmailExisted
        ? VieErrorMessageConstant.KitchenCenterManagerEmailExisted
        : response === EngErrorMessageConstant.ExistedActiveStores_Delete
        ? VieErrorMessageConstant.ExistedActiveStores_Delete
        : response === EngErrorMessageConstant.NotBelongToKitchenCenter
        ? VieErrorMessageConstant.NotBelongToKitchenCenter
        : response === EngErrorMessageConstant.InvalidStatusFilter
        ? VieErrorMessageConstant.InvalidStatusFilter
        : response === EngErrorMessageConstant.NotBelongToBrand
        ? VieErrorMessageConstant.NotBelongToBrand
        : response === EngErrorMessageConstant.DeactiveBrand_Delete
        ? VieErrorMessageConstant.DeactiveBrand_Delete
        : response === EngErrorMessageConstant.DeactiveBrand_Update
        ? VieErrorMessageConstant.DeactiveBrand_Update
        : response === EngErrorMessageConstant.BrandManagerEmailExisted
        ? VieErrorMessageConstant.BrandManagerEmailExisted
        : response === EngErrorMessageConstant.RoleNotSuitable
        ? VieErrorMessageConstant.RoleNotSuitable
        : response === EngErrorMessageConstant.ProductNotBelongToBrand
        ? VieErrorMessageConstant.ProductNotBelongToBrand
        : response === EngErrorMessageConstant.KeySortNotExist
        ? VieErrorMessageConstant.KeySortNotExist
        : response === EngErrorMessageConstant.BrandNotJoinKitchenCenter
        ? VieErrorMessageConstant.BrandNotJoinKitchenCenter
        : response === EngErrorMessageConstant.KitchenCenterNotHaveBrand
        ? VieErrorMessageConstant.KitchenCenterNotHaveBrand
        : response === EngErrorMessageConstant.BrandNotHaveStore
        ? VieErrorMessageConstant.BrandNotHaveStore
        : response === EngErrorMessageConstant.KitchenCenterNotHaveStore
        ? VieErrorMessageConstant.KitchenCenterNotHaveStore
        : response === EngErrorMessageConstant.DeactiveStore_Update
        ? VieErrorMessageConstant.DeactiveStore_Update
        : response === EngErrorMessageConstant.DeactiveStore_Delete
        ? VieErrorMessageConstant.DeactiveStore_Delete
        : response === EngErrorMessageConstant.ManageremailExisted
        ? VieErrorMessageConstant.ManageremailExisted
        : response === EngErrorMessageConstant.NotConfirmingStore
        ? VieErrorMessageConstant.NotConfirmingStore
        : response === EngErrorMessageConstant.NotRejectedResonForNewStore
        ? VieErrorMessageConstant.NotRejectedResonForNewStore
        : response === EngErrorMessageConstant.StoreIdNotBelongToStore
        ? VieErrorMessageConstant.StoreIdNotBelongToStore
        : response === EngErrorMessageConstant.StoresWithStatusNameParam
        ? VieErrorMessageConstant.StoresWithStatusNameParam
        : response === EngErrorMessageConstant.CategoryCodeExisted
        ? VieErrorMessageConstant.CategoryCodeExisted
        : response === EngErrorMessageConstant.DeactiveCategory_Delete
        ? VieErrorMessageConstant.DeactiveCategory_Delete
        : response === EngErrorMessageConstant.DeactiveCategory_Update
        ? VieErrorMessageConstant.DeactiveCategory_Update
        : response === EngErrorMessageConstant.InvalidCategoryType
        ? VieErrorMessageConstant.InvalidCategoryType
        : response === EngErrorMessageConstant.NotExistCategoryType
        ? VieErrorMessageConstant.NotExistCategoryType
        : response === EngErrorMessageConstant.StatusInvalid
        ? VieErrorMessageConstant.StatusInvalid
        : response === EngErrorMessageConstant.CategoryMustBeNormal
        ? VieErrorMessageConstant.CategoryMustBeNormal
        : response === EngErrorMessageConstant.ExtraCategoryGreaterThan0
        ? VieErrorMessageConstant.ExtraCategoryGreaterThan0
        : response === EngErrorMessageConstant.ListExtraCategoryIdIsExtraType
        ? VieErrorMessageConstant.ListExtraCategoryIdIsExtraType
        : response === EngErrorMessageConstant.ListExtraCategoryIdIsActive
        ? VieErrorMessageConstant.ListExtraCategoryIdIsActive
        : response === EngErrorMessageConstant.ExtraCategoryIdNotBelongToBrand
        ? VieErrorMessageConstant.ExtraCategoryIdNotBelongToBrand
        : response === EngErrorMessageConstant.ExtraCategoryIdDoesNotExist
        ? VieErrorMessageConstant.ExtraCategoryIdDoesNotExist
        : response === EngErrorMessageConstant.BankingAccountNotBelongToKitchenCenter
        ? VieErrorMessageConstant.BankingAccountNotBelongToKitchenCenter
        : response === EngErrorMessageConstant.NumberAccountExisted
        ? VieErrorMessageConstant.NumberAccountExisted
        : response === EngErrorMessageConstant.ProductCodeExisted
        ? VieErrorMessageConstant.ProductCodeExisted
        : response === EngErrorMessageConstant.ParentProductIdNotExist
        ? VieErrorMessageConstant.ParentProductIdNotExist
        : response === EngErrorMessageConstant.ParentProductIdNotBelongToBrand
        ? VieErrorMessageConstant.ParentProductIdNotBelongToBrand
        : response === EngErrorMessageConstant.CategoryNotSuitableForSingleOrParentProductType
        ? VieErrorMessageConstant.CategoryNotSuitableForSingleOrParentProductType
        : response === EngErrorMessageConstant.CategoryNotSuitableForEXTRAProductType
        ? VieErrorMessageConstant.CategoryNotSuitableForEXTRAProductType
        : response === EngErrorMessageConstant.CategoryIdNotBelongToKitchenCenter
        ? VieErrorMessageConstant.CategoryIdNotBelongToKitchenCenter
        : response === EngErrorMessageConstant.InvalidProductType
        ? VieErrorMessageConstant.InvalidProductType
        : response === EngErrorMessageConstant.ProductNotBelongToStore
        ? VieErrorMessageConstant.ProductNotBelongToStore
        : response === EngErrorMessageConstant.ProductNotSpendToStore
        ? VieErrorMessageConstant.ProductNotSpendToStore
        : response === EngErrorMessageConstant.ProductNameNotFollowingFormat
        ? VieErrorMessageConstant.ProductNameNotFollowingFormat
        : response === EngErrorMessageConstant.ProductNameTypeChildNotAllowUpdate
        ? VieErrorMessageConstant.ProductNameTypeChildNotAllowUpdate
        : response === EngErrorMessageConstant.ProductIdNotParentType
        ? VieErrorMessageConstant.ProductIdNotParentType
        : response === EngErrorMessageConstant.DupplicatedPartnerName
        ? VieErrorMessageConstant.DupplicatedPartnerName
        : response === EngErrorMessageConstant.DupplicatedWebUrl
        ? VieErrorMessageConstant.DupplicatedWebUrl
        : response === EngErrorMessageConstant.DeactivePartner_Update
        ? VieErrorMessageConstant.DeactivePartner_Update
        : response === EngErrorMessageConstant.DeactivePartner_Delete
        ? VieErrorMessageConstant.DeactivePartner_Delete
        : response === EngErrorMessageConstant.DeactivePartner_Get
        ? VieErrorMessageConstant.DeactivePartner_Get
        : response === EngErrorMessageConstant.PartnerHasPartnerStoreActive_Update
        ? VieErrorMessageConstant.PartnerHasPartnerStoreActive_Update
        : response === EngErrorMessageConstant.PartnerHasPartnerStoreActive_Delete
        ? VieErrorMessageConstant.PartnerHasPartnerStoreActive_Delete
        : response === EngErrorMessageConstant.CashierIdNotBelongToKitchenCenter
        ? VieErrorMessageConstant.CashierIdNotBelongToKitchenCenter
        : response === EngErrorMessageConstant.CashierIdNotBelogToCashier
        ? VieErrorMessageConstant.CashierIdNotBelogToCashier
        : response === EngErrorMessageConstant.StatusIsRequiredWithKitchenCenterManager
        ? VieErrorMessageConstant.StatusIsRequiredWithKitchenCenterManager
        : response === EngErrorMessageConstant.StatusIsNotRequiredWithCashier
        ? VieErrorMessageConstant.StatusIsNotRequiredWithCashier
        : response === EngErrorMessageConstant.InactiveStore_Create
        ? VieErrorMessageConstant.InactiveStore_Create
        : response === EngErrorMessageConstant.StoreNotBelongToBrand
        ? VieErrorMessageConstant.StoreNotBelongToBrand
        : response === EngErrorMessageConstant.LinkedWithParner
        ? VieErrorMessageConstant.LinkedWithParner
        : response === EngErrorMessageConstant.UsernameExisted
        ? VieErrorMessageConstant.UsernameExisted
        : response === EngErrorMessageConstant.NotLinkedWithParner
        ? VieErrorMessageConstant.NotLinkedWithParner
        : response === EngErrorMessageConstant.DeactiveStorePartner_Update
        ? VieErrorMessageConstant.DeactiveStorePartner_Update
        : response === EngErrorMessageConstant.DupplicatedPartnerId_Create
        ? VieErrorMessageConstant.DupplicatedPartnerId_Create
        : response === EngErrorMessageConstant.GrabFoodAccountMustBeStoreManager
        ? VieErrorMessageConstant.GrabFoodAccountMustBeStoreManager
        : response === EngErrorMessageConstant.ItemOnGrabfoodCanNotMapping
        ? VieErrorMessageConstant.ItemOnGrabfoodCanNotMapping
        : response === EngErrorMessageConstant.ModifierGroupOnGrabfoodCanNotMapping
        ? VieErrorMessageConstant.ModifierGroupOnGrabfoodCanNotMapping
        : response === EngErrorMessageConstant.DeactiveProduct_Create_Update
        ? VieErrorMessageConstant.DeactiveProduct_Create_Update
        : response === EngErrorMessageConstant.InactiveProduct_Create_Update
        ? VieErrorMessageConstant.InactiveProduct_Create_Update
        : response === EngErrorMessageConstant.InactiveStore_Update
        ? VieErrorMessageConstant.InactiveStore_Update
        : response === EngErrorMessageConstant.StatusInValid
        ? VieErrorMessageConstant.StatusInValid
        : response === EngErrorMessageConstant.OrderNotBelongToKitchenCenter
        ? VieErrorMessageConstant.OrderNotBelongToKitchenCenter
        : response === EngErrorMessageConstant.OrderShipperPhoneNotMatch
        ? VieErrorMessageConstant.OrderShipperPhoneNotMatch
        : response === EngErrorMessageConstant.OrderIsPreparing
        ? VieErrorMessageConstant.OrderIsPreparing
        : response === EngErrorMessageConstant.OrderIsReady
        ? VieErrorMessageConstant.OrderIsReady
        : response === EngErrorMessageConstant.OrderIsUpcoming
        ? VieErrorMessageConstant.OrderIsUpcoming
        : response === EngErrorMessageConstant.OrderIsCompleted
        ? VieErrorMessageConstant.OrderIsCompleted
        : response === EngErrorMessageConstant.OrderIsCancelled
        ? VieErrorMessageConstant.OrderIsCancelled
        : response === EngErrorMessageConstant.OrderAlreadyPaid
        ? VieErrorMessageConstant.OrderAlreadyPaid
        : response === EngErrorMessageConstant.OrderPartnerIdNotExist
        ? VieErrorMessageConstant.OrderPartnerIdNotExist
        : response === EngErrorMessageConstant.OrderPartnerIdAlreadyExist
        ? VieErrorMessageConstant.OrderPartnerIdAlreadyExist
        : response === EngErrorMessageConstant.DisplayIdAlreadyExist
        ? VieErrorMessageConstant.DisplayIdAlreadyExist
        : response === EngErrorMessageConstant.ProductPartnerNotMappingBefore
        ? VieErrorMessageConstant.ProductPartnerNotMappingBefore
        : response === EngErrorMessageConstant.ProductExtraPartnerNotMappingBefore
        ? VieErrorMessageConstant.ProductExtraPartnerNotMappingBefore
        : response === EngErrorMessageConstant.ProductInOrderNotExistInTheSystem
        ? VieErrorMessageConstant.ProductInOrderNotExistInTheSystem
        : response === EngErrorMessageConstant.ProductExtraInOrderDetailNotExistInTheSystem
        ? VieErrorMessageConstant.ProductExtraInOrderDetailNotExistInTheSystem
        : response === EngErrorMessageConstant.OrderIdNotExist
        ? VieErrorMessageConstant.OrderIdNotExist
        : response === EngErrorMessageConstant.OrderIdNotBelongToStore
        ? VieErrorMessageConstant.OrderIdNotBelongToStore
        : response === EngErrorMessageConstant.OrderIdNotBelongToKitchenCenter
        ? VieErrorMessageConstant.OrderIdNotBelongToKitchenCenter
        : response === EngErrorMessageConstant.OrderIsReady_Change_To_Ready
        ? VieErrorMessageConstant.OrderIsReady_Change_To_Ready
        : response === EngErrorMessageConstant.OrderIsUpcoming_Change_To_Ready
        ? VieErrorMessageConstant.OrderIsUpcoming_Change_To_Ready
        : response === EngErrorMessageConstant.OrderIsCompleted_Change_To_Ready
        ? VieErrorMessageConstant.OrderIsCompleted_Change_To_Ready
        : response === EngErrorMessageConstant.OrderIsCancelled_Change_To_Ready
        ? VieErrorMessageConstant.OrderIsCancelled_Change_To_Ready
        : response === EngErrorMessageConstant.OrderIsReadyDelivery_Change_To_Ready
        ? VieErrorMessageConstant.OrderIsReadyDelivery_Change_To_Ready
        : response === EngErrorMessageConstant.OrderIsPreparing_Change_To_ReadyDelivery
        ? VieErrorMessageConstant.OrderIsPreparing_Change_To_ReadyDelivery
        : response === EngErrorMessageConstant.OrderIsUpcoming_Change_To_ReadyDelivery
        ? VieErrorMessageConstant.OrderIsUpcoming_Change_To_ReadyDelivery
        : response === EngErrorMessageConstant.OrderIsCompeleted_Change_To_ReadyDelivery
        ? VieErrorMessageConstant.OrderIsCompeleted_Change_To_ReadyDelivery
        : response === EngErrorMessageConstant.OrderIsCancelled_Change_To_ReadyDelivery
        ? VieErrorMessageConstant.OrderIsCancelled_Change_To_ReadyDelivery
        : response === EngErrorMessageConstant.OrderIsReadyDelivery_Change_To_ReadyDelivery
        ? VieErrorMessageConstant.OrderIsReadyDelivery_Change_To_ReadyDelivery
        : response === EngErrorMessageConstant.OrderIsReady_Cancel
        ? VieErrorMessageConstant.OrderIsReady_Cancel
        : response === EngErrorMessageConstant.OrderIsCompleted_Cancel
        ? VieErrorMessageConstant.OrderIsCompleted_Cancel
        : response === EngErrorMessageConstant.OrderIsCancelled_Cancel
        ? VieErrorMessageConstant.OrderIsCancelled_Cancel
        : response === EngErrorMessageConstant.OrderIsReadyDelivery_Cancel
        ? VieErrorMessageConstant.OrderIsReadyDelivery_Cancel
        : response === EngErrorMessageConstant.NoChangeOrderStatusWhenClosedShift
        ? VieErrorMessageConstant.NoChangeOrderStatusWhenClosedShift
        : response === EngErrorMessageConstant.BalanceIsInvalid
        ? VieErrorMessageConstant.BalanceIsInvalid
        : response === EngErrorMessageConstant.BalanceIsInvalid
        ? VieErrorMessageConstant.BalanceIsInvalid
        : response === EngErrorMessageConstant.StoreIdNotBelogToKitchenCenter
        ? VieErrorMessageConstant.StoreIdNotBelogToKitchenCenter
        : response === EngErrorMessageConstant.BalanceDoesNotEnough
        ? VieErrorMessageConstant.BalanceDoesNotEnough
        : response === EngErrorMessageConstant.AlreadyTransferredToStore
        ? VieErrorMessageConstant.AlreadyTransferredToStore
        : response === EngErrorMessageConstant.AlreadyTransferredToKitchenCenter
        ? VieErrorMessageConstant.AlreadyTransferredToKitchenCenter
        : response === EngErrorMessageConstant.TransferToStoreSuccessfully
        ? VieErrorMessageConstant.TransferToStoreSuccessfully
        : response === EngErrorMessageConstant.TransferToKitchenCenterSuccessfully
        ? VieErrorMessageConstant.TransferToKitchenCenterSuccessfully
        : response === EngErrorMessageConstant.NotExistJobId
        ? VieErrorMessageConstant.NotExistJobId
        : response === EngErrorMessageConstant.ConfigDoesNotExist
        ? VieErrorMessageConstant.ConfigDoesNotExist
        : response === EngErrorMessageConstant.NotExistOrderPartnerId
        ? VieErrorMessageConstant.NotExistOrderPartnerId
        : response === EngErrorMessageConstant.AccountNoLongerActive
        ? VieErrorMessageConstant.AccountNoLongerActive
        : response === EngErrorMessageConstant.NoOneKitchenCenterAvailable
        ? VieErrorMessageConstant.NoOneKitchenCenterAvailable
        : response === EngErrorMessageConstant.StoreIdDoesNotExisted
        ? VieErrorMessageConstant.StoreIdDoesNotExisted
        : response === EngErrorMessageConstant.StoreIdNotBelongToBrand
        ? VieErrorMessageConstant.StoreIdNotBelongToBrand
        : response === EngErrorMessageConstant.CategoryCodeExistedInBrand
        ? VieErrorMessageConstant.CategoryCodeExistedInBrand
        : response === EngErrorMessageConstant.ProductIdNotBelongToBrand
        ? VieErrorMessageConstant.ProductIdNotBelongToBrand
        : response === EngErrorMessageConstant.InvalidProductTypeParent
        ? VieErrorMessageConstant.InvalidProductTypeParent
        : response === EngErrorMessageConstant.InvalidProductTypeChild
        ? VieErrorMessageConstant.InvalidProductTypeChild
        : response === EngErrorMessageConstant.InvalidProductTypeSingle
        ? VieErrorMessageConstant.InvalidProductTypeSingle
        : response === EngErrorMessageConstant.InvalidProductTypeExtra
        ? VieErrorMessageConstant.InvalidProductTypeExtra
        : response === EngErrorMessageConstant.InvalidOnField
        ? VieErrorMessageConstant.InvalidOnField
        : response === EngErrorMessageConstant.NoOneCashierAvailable
        ? VieErrorMessageConstant.NoOneCashierAvailable
        : response === EngErrorMessageConstant.BrandHasNoActiveProduct
        ? VieErrorMessageConstant.BrandHasNoActiveProduct
        : response === EngErrorMessageConstant.ParentProductMappingNotYet
        ? VieErrorMessageConstant.ParentProductMappingNotYet
        : response === EngErrorMessageConstant.ProductCodeExistedInTheSystem
        ? VieErrorMessageConstant.ProductCodeExistedInTheSystem
        : response === EngErrorMessageConstant.StatusInValid
        ? VieErrorMessageConstant.StatusInValid
        : response === EngErrorMessageConstant.ProductCodeNotExistInGrabFoodSystem
        ? VieErrorMessageConstant.ProductCodeNotExistInGrabFoodSystem
        : response === EngErrorMessageConstant.PriceNotMatchWithProductInGrabFoodSystem
        ? VieErrorMessageConstant.PriceNotMatchWithProductInGrabFoodSystem
        : response === EngErrorMessageConstant.StatusNotMatchWithProductInGrabFoodSystem
        ? VieErrorMessageConstant.StatusNotMatchWithProductInGrabFoodSystem
        : response === EngErrorMessageConstant.ProductPartnerNotAvailableNow
        ? VieErrorMessageConstant.ProductPartnerNotAvailableNow
        : response === EngErrorMessageConstant.ProductPriceNotMatchWithPartnerProduct
        ? VieErrorMessageConstant.ProductPriceNotMatchWithPartnerProduct
        : response === EngErrorMessageConstant.ExtraProductPriceNotMatchWithPartnerProduct
        ? VieErrorMessageConstant.ExtraProductPriceNotMatchWithPartnerProduct
        : response === EngErrorMessageConstant.NoOneOutOfStock
        ? VieErrorMessageConstant.NoOneOutOfStock
        : response === EngErrorMessageConstant.UpdatePartnerProductSuccessfully
        ? VieErrorMessageConstant.UpdatePartnerProductSuccessfully
        : response === EngErrorMessageConstant.NoChangeOrderStatusNotToday
        ? VieErrorMessageConstant.NoChangeOrderStatusNotToday
        : response === EngErrorMessageConstant.StoreBalanceIsInvalid
        ? VieErrorMessageConstant.StoreBalanceIsInvalid
        : response === EngErrorMessageConstant.NoOneOutOfStock
        ? VieErrorMessageConstant.NoOneOutOfStock
        : response === EngErrorMessageConstant.avatarIsNotNull
        ? VieErrorMessageConstant.avatarIsNotNull
        : response === EngErrorMessageConstant.IdNotSuitable
        ? VieErrorMessageConstant.IdNotSuitable
        : response === EngErrorMessageConstant.KitchenCenterIdNotSuitable
        ? VieErrorMessageConstant.KitchenCenterIdNotSuitable
        : response === EngErrorMessageConstant.BrandIdNotSuitable
        ? VieErrorMessageConstant.BrandIdNotSuitable
        : response === EngErrorMessageConstant.CategoryIdNotSuitable
        ? VieErrorMessageConstant.CategoryIdNotSuitable
        : response === EngErrorMessageConstant.ProductIdNotSuitable
        ? VieErrorMessageConstant.ProductIdNotSuitable
        : response
      : response;

  return responseMessage;
};
